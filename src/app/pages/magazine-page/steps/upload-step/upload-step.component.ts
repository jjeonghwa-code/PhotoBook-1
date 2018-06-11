import { Component, OnInit } from '@angular/core';
import { UploadStateService } from './services/upload-state.service';
import { StateService } from '@photobook/state-service';

@Component({
  selector: 'pb-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.scss']
})
export class UploadStepComponent implements OnInit {

  magazine$ = this.stateService.magazine$;

  constructor(
    private uploadStateService: UploadStateService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.getPhotos();
  }

  async getPhotos() {
    await this.uploadStateService.getPhotos().toPromise();
  }

  deleteFile(file) {
    this.uploadStateService.openDeleteConfirmModal(file);
  }

}
