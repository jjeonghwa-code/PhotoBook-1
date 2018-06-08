import { Component, OnInit } from '@angular/core';
import { UploadStateService } from './services/upload-state.service';

@Component({
  selector: 'pb-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.scss']
})
export class UploadStepComponent implements OnInit {

  constructor(
    private uploadStateService: UploadStateService
  ) { }

  ngOnInit() {
    this.uploadStateService.getPhotos().subscribe(res => {
      // nothing
    });
  }

}
