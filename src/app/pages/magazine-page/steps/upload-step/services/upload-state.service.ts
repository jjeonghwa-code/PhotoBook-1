import { Injectable } from '@angular/core';
import { FileService } from '@photobook/core/services/file.service';
import { filter, finalize, map, switchMap, tap, catchError } from 'rxjs/operators';
import { StateService } from '@photobook/state-service';
import { of } from 'rxjs/internal/observable/of';
import { MatDialog } from '@angular/material';
import { DeleteConfirmModalComponent } from '../components/delete-confirm-modal/delete-confirm-modal.component';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import * as _ from 'lodash';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { PhotoEditModalComponent } from '../components/photo-edit-modal/photo-edit-modal.component';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadStateService {

  fileExt: string[] = ['JPG', 'JPEG'];
  totalPortraitCounts = 0;
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private stateService: StateService
  ) { }

  getPhotos() {
    return this.fileService.getFolder()
      .pipe(
        filter((x: any) => parseInt(x.errNum, 10) === 200),
        switchMap((x: any) => this.refreshPhotos()),
      );
  }

  deletePhotos() {
    return this.fileService.deleteAllPhoto()
      .pipe(
        filter((x: any) => parseInt(x.errNum, 10) === 200),
        tap(() => this.stateService.deleteAllFiles())
      );
  }

  uploadEdited(file, base64Image) {
    const base64result = base64Image.substr(base64Image.indexOf(',') + 1);
    return this.fileService.uploadCloudEdited(file.id, base64result)
      .pipe(
        filter((x: any) => parseInt(x.errNum, 10) === 200),
        tap((res: any) => {
          this.stateService.replaceFile(file, res);
        })
      );
  }

  saveMood(file, mood) {
    this.stateService.saveMood(file, mood);
  }

  refreshPhotos() {
    return combineLatest(this.fileService.getFolderPhotos(), this.stateService.getStorage())
      .pipe(
        filter((x: Array<any>) => x.length === 2),
        tap((results) => {
          let files = parseInt(results[0].errNum, 10) === 200 ? results[0].images : [];
          files = files.map((x, index) => {
            const image = new StorageFileInfo();
            image.buildFileInfoFromImage(x, index);
            return image;
          });
          const storage = parseInt(results[1].errNum, 10) === 200 ? results[1].strMagazine : '';
          this.stateService.refreshState(files, storage);
        })
      );
  }

  openDeleteConfirmModal(file) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      width: '570px',
      panelClass: 'confirm-dialog',
      data : {
        confirmMessage: 'Are you sure to delete this photo?'
      }
    });
    dialogRef.afterClosed().pipe(filter(x => x)).subscribe(() => {
      this.isLoading = true;
      this.fileService.deleteFile(file)
        .pipe(
          tap(() => {
            this.stateService.deleteFile(file);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(event => {});
    });
  }

  openDeleteAllConfirmModal() {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      width: '570px',
      panelClass: 'confirm-dialog',
      data : {
        confirmMessage: 'Are you sure to delete all photos?'
      }
    });
    dialogRef.afterClosed().pipe(filter(x => x)).subscribe(() => {
      this.isLoading = true;
      this.fileService.deleteAllPhoto()
        .pipe(
          filter((x: any) => parseInt(x.errNum, 10) === 200),
          tap(() => {
            this.stateService.deleteAllFiles();
            this.isLoading = false;
          })
        )
        .subscribe(event => {});
    });
  }

  getMoodHtml(mood) {
    if (!mood.text) {
      return '';
    }
    let align = 'center';
    if (mood.align === 0) {
      align = 'left';
    } else if (mood.align === 1) {
      align = 'center';
    } else {
      align = 'right';
    }

    mood.background.color = mood.background.color.replace('#', '');
    const r = parseInt(mood.background.color.substring(0, 2), 16);
    const g = parseInt(mood.background.color.substring(2, 4), 16);
    const b = parseInt(mood.background.color.substring(4, 6), 16);
    const rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + mood.background.transparency + ')';

    if (mood.text) {
      return `
      <p style="color: ${mood.color};
      text-align: ${align};
      font-style: ${mood.style.italic ? 'italic' : ''};
      text-decoration: ${mood.style.underline ? 'underline' : ''};
      background-color: ${rgba};
      font-weight: ${mood.style.bold ? 'bold' : ''};
      font-family: ${mood.font}">${mood.text}</p>`;
    } else {
      return '';
    }
  }

  async saveNewFiles(files) {
    if (files.length > 0 && (!this.isValidFileExtension(files))) {
      return;
    }
    const pendingFiles = _.values(files);
    for (const file of pendingFiles) {
      const imageObj = await this.readFileAsBase64(file) as any;
      const size: any = await this.getSizeFromBase64(imageObj.url);
      imageObj.height = size.height;
      imageObj.width = size.width;
      const currentIndex = this.stateService.tempFiles.length;
      this.stateService.updateTempList(imageObj);
      if (imageObj) {
        await this.fileService.uploadFile(file).pipe(
          finalize(() => imageObj.isLoading = false),
          catchError(err => {
            this.stateService.markFileAsFailed(currentIndex);
            return of(err);
          }),
          tap((res: any) => {
            if (parseInt(res.errNum, 10) === 200) {
              const newImageObj = new StorageFileInfo();
              newImageObj.buildFileInfoFromImage(res, currentIndex);
              this.stateService.updateTempList(newImageObj, currentIndex);
            }
          })).toPromise();
      }
    }
  }

  private isValidFileExtension(files) {
    const extensions = this.fileExt.map(x => x.toLocaleUpperCase().trim());
    for (const file of files) {
      const ext = file.name.toUpperCase().split('.').pop() || file.name;
      if (!extensions.includes(ext)) {
        // TODO: notification
        return false;
      }
    }
    return true;
  }

  readFileAsBase64(file) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        resolve(null);
      };
      fileReader.onload = () => {
        const obj = new StorageFileInfo(fileReader.result);
        obj.isLoading = true;
        resolve(obj);
      };
      fileReader.readAsDataURL(file);
    });
  }

  readUrlAsBase64(url) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = () => {
        xhr.abort();
        resolve(null);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  getSizeFromBase64(base64string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve({width: image.width, height: image.height});
      };
      image.onerror = (e) => {
        resolve({width: 0, height: 0});
      };
      image.src = base64string;
    });
  }

  getFileByIndex(index) {
    return this.stateService.files[index];
  }

  getFileLength() {
    return this.stateService.files.length;
  }

  isTooSmall(file) {
    if (!file) {
      return;
    }

    const min = 800;
    if (file.width < min || file.height < min) {
      return true;
    }

    return false;
  }

  isWrongRatio(file) {
    if (!file) {
      return;
    }

    const fourThree = 4 / 3;
    const threeFour = 3 / 4;
    const standardRatio = file.orientation === 0 ? fourThree : threeFour;
    const tolerance = 0.01;
    const ratio = file.width / file.height;
    if (Math.abs(ratio - standardRatio) > tolerance) {
      return true;
    }

    return false;
  }

  sortByDate() {
    this.stateService.sortByDate();
  }

  sortByName() {
    this.stateService.sortByName();
  }
}
