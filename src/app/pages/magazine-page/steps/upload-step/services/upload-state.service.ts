import { Injectable } from '@angular/core';
import { FileService } from '@photobook/core/services/file.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { StateService } from '@photobook/state-service';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class UploadStateService {

  totalPortraitCounts = 0;

  constructor(
    private fileService: FileService,
    private stateService: StateService
  ) { }

  getPhotos() {
    return this.fileService.getFolder()
      .pipe(
        switchMap((x: any) => {
          if (parseInt(x.errNum, 10) === 200) {
            return this.fileService.getFolderPhotos();
          } else {
            return of(x);
          }
        }),
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            const newList = res.images.map((file, index) => {
              const newFile = {
                url: file.imgUrl,
                name: file.imgName,
                orientation: +file.imgWidth > +file.imgHeight ? 0 : 1,
                isCover: file.isCover === true,
                id: file.imgID,
                height: +file.imgHeight,
                width: +file.imgWidth,
                text: file.text,
                weight: index,
                isNotUploaded: false
              };
              if (newFile.orientation) {
                this.totalPortraitCounts += 1;
              }
              return newFile;
            });
            this.stateService.setMagazinePart('files', newList);
          }
        })
      );
  }
}
