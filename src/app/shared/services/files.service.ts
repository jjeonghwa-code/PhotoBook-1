import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { AppStateService } from './app-state.service';
import { environment } from '../../../environments/environment';
import { API } from '../consts';

@Injectable()
export class FilesService {
  files = this.appStateService.magazine || [];
  user = this.appStateService.user || {};
  folder_id = -1;
  cloudfolder = '';
  user_id = -1;
  imageScaleUrl = API.url.imageScaleUrl;

  // getFolder = getFolder;
  // getFolderPhotos = getFolderPhotos;
  // uploadFile = uploadFile;
  // deleteFile = deleteFile;
  // deleteAllCloudPhotos = deleteAllCloudPhotos;
  // getFileById = getFileById;
  // getFirstPortrait = getFirstPortrait;
  // updateRotation = updateRotation;

  // vm.uploadPDF = uploadPDF;

  constructor(
    private httpService: HttpService,
    private appStateService: AppStateService
  ) {}

  public getFolder() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.user.use_guid);

    return this.httpService.post(API.url.getCloudFolder, body, { headers })
      .map((res) => {
        this.folder_id = res.data.folder_id;
        this.cloudfolder = res.data.cloudfolder;
        this.user_id = res.data.user_id;
        return res;
      });
  }

  public getFolderPhotos() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.user.use_guid)
      .set('folder_id', this.folder_id.toString());

    return this.httpService.post(API.url.getCloudPhotos, body, { headers })
      .map((res) => {
        return res;
      });
  }

  public uploadFile(file) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', undefined);
    const body = new HttpParams()
      .set('folder_id', this.folder_id.toString())
      .set('user_id', this.user_id.toString())
      .set('cloudfolder', this.cloudfolder)
      .set('upl_filename', file.name)
      .set('upl_attachment', file);

    return this.httpService.post(API.url.uploadCloud, body, { headers })
      .map((res) => {
        return res;
      });
  }
}
