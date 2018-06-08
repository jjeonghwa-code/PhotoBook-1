import { Injectable } from '@angular/core';
import { AppStateService } from '../../../../shared/services';

@Injectable()
export class PhotoUploadService {

  files = [];

  totalPortraitCounts = 0;
  minPortraitFiles = 2;

  maxFiles = 100;
  minFiles = 36;
  maxSize = 5; // 5mb for file size

  static isTooSmall(file: any) {
    const min = 800;
    if (!file) {
      return; // TODO: clarify this case
    }
    return file.width < min || file.height < min;
  }

  static isWrongRatio(file: any) {
    if (!file) {
      return;
    }
    const fourThree = 4 / 3;
    const threeFour = 3 / 4;
    const standardRatio = file.orientation === 0 ? fourThree : threeFour;
    const tolerance = 0.01;
    const ratio = file.width / file.height;
    return Math.abs(ratio - standardRatio) > tolerance;
  }

  constructor(
    private appStateService: AppStateService
  ) {
    // initializing
    this.files = this.appStateService.getMagazine['files'] || [];
  }
}
