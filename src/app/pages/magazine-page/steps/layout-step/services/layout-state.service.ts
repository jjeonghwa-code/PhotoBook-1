import { EventEmitter, Injectable } from '@angular/core';
import { StateService } from '@photobook/state-service';
import { Magazine } from '@photobook/core/models/magazine';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { CommonService } from '@photobook/common-service';
import { MagazineProd } from '@photobook/core/models/magazine-prod';

@Injectable({
  providedIn: 'root'
})
export class LayoutStateService {

  setCurrentMagazine: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private stateService: StateService,
    private commonService: CommonService
  ) { }

  get selectedLayoutOption() {
    return this.stateService.selectedLayoutOption;
  }

  get magazine(): Magazine {
    return this.stateService.getMagazine();
  }

  get cover() {
    const magazine: Magazine = this.stateService.getMagazine();
    return magazine.files.find(x => x.id === magazine.selectedCover);
  }

  get magazineStyle() {
    const magazine: Magazine = this.stateService.getMagazine();
    return magazine.magazineStyle;
  }

  get magazinePattern() {
    const magazine: Magazine = this.stateService.getMagazine();
    return this.commonService.getPatternImage(magazine.magazineStyle.pattern, 'png');
  }

  photoUrl(url) {
    return this.commonService.checkImageUrl(url);
  }
}
