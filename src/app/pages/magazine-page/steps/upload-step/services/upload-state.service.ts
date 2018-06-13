import { Injectable } from '@angular/core';
import { FileService } from '@photobook/core/services/file.service';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { StateService } from '@photobook/state-service';
import { of } from 'rxjs/internal/observable/of';
import { MatDialog } from '@angular/material';
import { DeleteConfirmModalComponent } from '../components/delete-confirm-modal/delete-confirm-modal.component';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import * as _ from 'lodash';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { PhotoEditModalComponent } from '../components/photo-edit-modal/photo-edit-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UploadStateService {

  fileExt: string[] = ['JPG', 'JPEG'];
  totalPortraitCounts = 0;

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
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {width: '250px'});
    dialogRef.afterClosed().pipe(filter(x => x)).subscribe(() => {
      this.fileService.deleteFile(file)
        .pipe(
          switchMap((x: any) => parseInt(x.errNum, 10) === 200 ? this.refreshPhotos() : of(x)),
          filter((x: any) => parseInt(x.errNum, 10) === 200))
        .subscribe(event => {});
    });
  }

  async saveNewFiles(files) {
    if (files.length > 0 && (!this.isValidFileExtension(files))) {
      return;
    }
    const pendingFiles = _.values(files);
    for (const file of pendingFiles) {
      const imageObj = await this.readFileAsBase64(file) as any;
      const currentIndex = this.stateService.tempFiles.length;
      this.stateService.updateTempList(imageObj);
      if (imageObj) {
        this.fileService.uploadFile(file).pipe(
          finalize(() => imageObj.isLoading = false),
          tap((res: any) => {
            if (parseInt(res.errNum, 10) === 200) {
              const newImageObj = new StorageFileInfo();
              newImageObj.buildFileInfoFromImage(res, currentIndex);
              this.stateService.updateTempList(newImageObj, currentIndex);
            } else {
              // upload failed
            }
          })).subscribe(() => {});
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

  getFileByIndex(index) {
    return this.stateService.files[index];
  }
}
