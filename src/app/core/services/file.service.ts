import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '@photobook/core/consts/api';
import { StateService } from '@photobook/state-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) { }



  getFolder() {
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('use_guid', this.stateService.userInfo.use_guid);

    return this.http.post(API.url.getCloudFolder, body, { headers })
      .pipe(
        map((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.stateService.folder_id = res.folder_id;
            this.stateService.cloudfolder = res.cloudfolder;
            this.stateService.user_id = res.user_id;
          }
          return res;
        })
      );
  }

  getFolderPhotos() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.stateService.userInfo.use_guid)
      .set('folder_id', this.stateService.folder_id.toString());

    return this.http.post(API.url.getCloudPhotos, body, { headers });
  }

  deleteFile(file) {
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.stateService.userInfo.use_guid)
      .set('photo_id', file.id);

    return this.http.post(API.url.deleteCloudPhoto, body, { headers });
  }

  uploadFile(file) {
    const formData: FormData = new FormData();
    formData.append('folder_id', this.stateService.folder_id.toString());
    formData.append('user_id', this.stateService.user_id.toString());
    formData.append('cloudfolder', this.stateService.cloudfolder);
    formData.append('upl_filename', file.name);
    formData.append('upl_attachment', file);

    return this.http.post(API.url.uploadCloud, formData);
  }
}
