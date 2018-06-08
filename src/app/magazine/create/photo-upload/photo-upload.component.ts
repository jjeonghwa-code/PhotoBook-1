import { Component, OnInit } from '@angular/core';
import { AppStateService, CommonService } from '../../../shared/services';
import { PhotoUploadService } from './services/photo-upload.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {

  totalPortraitCounts = 0;
  minPortraitFiles = 2;

  files = this.appStateService.getMagazine['files'] || [];



  constructor(
    public commonService: CommonService,
    public appStateService: AppStateService,
    public photoUploadService: PhotoUploadService
  ) { }

  ngOnInit() {
  }

  fileChange(e: any) {

  }

}
