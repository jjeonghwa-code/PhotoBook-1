import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '@photobook/core/consts/api';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  getFolder() {
    // const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    // const body = new HttpParams().set('use_guid', this.user.use_guid);

    // return this.http.post(API.url.getCloudFolder, body, { headers })
      // .map((res) => {
      //   this.folder_id = res.folder_id;
      //   this.cloudfolder = res.cloudfolder;
      //   this.user_id = res.user_id;
      //   return res;
      // });
  }
}
