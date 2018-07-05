import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonService } from '@photobook/common-service';
import { UploadStateService } from '../../services/upload-state.service';

@Component({
  selector: 'pb-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Output() addFiles: EventEmitter<any> = new EventEmitter();
  minPortraitFiles = 2;
  minFiles = 36;
  maxFiles = 100;

  isLoading = false;

  constructor(
    private uploadStateService: UploadStateService,
    public commonService: CommonService
  ) { }

  ngOnInit() {
  }

  get totalPortraitCounts() {
    return this.uploadStateService.getTotalPortraitCounts();
  }

  get warningFilesMessage() {
    const warningFiles = this.uploadStateService.getFiles().filter((file) => {
      return this.uploadStateService.isTooSmall(file) || this.uploadStateService.isWrongRatio(file);
    });

    const count = warningFiles.length;
    return count > 0
            ? this.commonService.translateTemplate('STEP_1_MESSAGE_WARNING_FILES', {n: count})
            : this.commonService.translateTemplate('STEP_1_MESSAGE_ONE_WARNING_FILE', {});
  }

  get uploadedFilesMessage() {
    const count = this.uploadStateService.getFileLength();
    return count > 0
            ? this.commonService.translateTemplate('STEP_1_MESSAGE_UPLOADED_FILES', {n: count})
            : this.commonService.translateTemplate('STEP_1_MESSAGE_ONE_UPLOADED_FILES', {});
  }

  get minMaxWarningMessage() {
    const uploadedCount = this.uploadStateService.getFileLength();
    const min = this.minFiles;
    const max = this.maxFiles;
    if (uploadedCount < min) {
      return this.commonService.translateTemplate('STEP_1_MESSAGE_MIN_FILES', {missingCount: min - uploadedCount});
    } else if (uploadedCount > max) {
      return this.commonService.translateTemplate('STEP_1_MESSAGE_MAX_FILES', {overCount: uploadedCount - max});
    }
  }

  add() {
    this.addFiles.emit();
  }
}
