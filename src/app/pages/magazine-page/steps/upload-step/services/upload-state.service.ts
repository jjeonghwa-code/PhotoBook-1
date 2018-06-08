import { Injectable } from '@angular/core';
import { FileService } from '@photobook/core/services/file.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadStateService {

  constructor(
    private fileService: FileService
  ) { }

  getPhotos() {
    return this.fileService.getFolder()
      .pipe(
        switchMap(x => this.fileService.getFolderPhotos()),
        map(x => {
          return x;
        })
      );
  }
}
