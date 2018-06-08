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
}
