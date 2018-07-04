import { Injectable } from '@angular/core';
import { StateService } from '@photobook/state-service';
import { FrontCover, Magazine } from '@photobook/core/models/magazine';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { CoverPosition } from '../components/cover-position-selector/cover-position-selector.component';

@Injectable({
  providedIn: 'root'
})
export class CoverStateService {

  constructor(
    private stateService: StateService
  ) {}

  getCoverInfo(): FrontCover {
    const magazine: any = this.stateService.getMagazine();
    return magazine.frontCover || {title: '', subtitle: '', position: CoverPosition.Middle};
  }

  getCoverImage(): StorageFileInfo {
    const magazine: Magazine = this.stateService.getMagazine();
    if (!magazine) {
      return;
    }
    if (!magazine.selectedCover) {
      const files = magazine.files.filter(x => x.orientation === 1);
      return files[0];
    } else {
      return magazine.files.find(x => x.id === magazine.selectedCover);
    }
  }

  getPortraitImages(): StorageFileInfo[] {
    const magazine: Magazine = this.stateService.getMagazine();
    return magazine.files.filter(x => x.orientation === 1);
  }

  setCoverImage(file) {
    this.stateService.setMagazinePart('selectedCover', file.id);
    const cover = this.getCoverInfo();
    cover.filePath = file.url;
    this.setFrontCover(cover);
  }

  setFrontCover(cover: FrontCover) {
   this.stateService.setMagazinePart('frontCover', cover);
  }

  saveCoverInfo(file, cover: FrontCover) {
    this.stateService.setMagazinePart('selectedCover', file.id);
    this.stateService.setMagazinePart('frontCover', cover);
    this.stateService.sendStorageToBackend();
  }

}
