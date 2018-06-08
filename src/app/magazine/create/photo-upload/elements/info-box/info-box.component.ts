import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../shared/services';
import { PhotoUploadService } from '../../services/photo-upload.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  constructor(
    public commonService: CommonService,
    public photoUploadService: PhotoUploadService
  ) { }

  ngOnInit() {
  }

  get isAvailable() {
    return this.photoUploadService.totalPortraitCounts < this.photoUploadService.minPortraitFiles;
  }

  get maxFiles() {
    return this.photoUploadService.maxFiles;
  }

  get description() {
    this.commonService.translateTemplate('STEP_1_MESSAGE_MIN_MAX_DEFAULT',
      {min: this.photoUploadService.minFiles, max: this.photoUploadService.maxFiles});
  }

  get minMaxPortraitMessage() {
    this.commonService.translateTemplate('STEP_1_MESSAGE_MISSING_PORTRAIT',
      {missingCount: this.photoUploadService.minPortraitFiles - this.photoUploadService.totalPortraitCounts});
  }

  get minMaxWarningMessage() {
    const uploadedCount = this.photoUploadService.files.length;
    if (uploadedCount < this.photoUploadService.minFiles) {
      return this.commonService.translateTemplate('STEP_1_MESSAGE_MIN_FILES',
        {missingCount: this.photoUploadService.minFiles - uploadedCount});
    } else if (uploadedCount > this.photoUploadService.maxFiles) {
      return this.commonService.translateTemplate('STEP_1_MESSAGE_MAX_FILES',
        {overCount: uploadedCount - this.photoUploadService.minFiles});
    }
  }

  get warningFilesMessage() {
    const warningFiles = this.photoUploadService.files.filter((file) => {
      return PhotoUploadService.isTooSmall(file) || PhotoUploadService.isWrongRatio(file);
    });
    const count = warningFiles.length;
    return count > 1
      ? this.commonService.translateTemplate('STEP_1_MESSAGE_WARNING_FILES', {n: count})
      : this.commonService.translateTemplate('STEP_1_MESSAGE_ONE_WARNING_FILE', {});
  }

  get uploadedFilesMessage() {
    const count = this.photoUploadService.files.length;
    return count > 1
      ? this.commonService.translateTemplate('STEP_1_MESSAGE_UPLOADED_FILES', {n: count})
      : this.commonService.translateTemplate('STEP_1_MESSAGE_ONE_UPLOADED_FILES', {});
  }

  fileChange(e: any) {

  }

}
