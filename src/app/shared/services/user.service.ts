import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { API } from '../consts';

@Injectable()
export class UserService {
  private _signedIn: boolean;

  constructor(private httpService: HttpService) {
    this._signedIn = localStorage.getItem('svh_auth_token') === 'true';
    console.log(123, this._signedIn);
  }

  get signedIn(): boolean {
    return this._signedIn;
  }

  set signedIn(val: boolean) {
    console.log(111, val);
    val ? localStorage.setItem('svh_auth_token', 'true') : localStorage.removeItem('svh_auth_token');
    this._signedIn = val;
  }

  public register(credentials) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_device', credentials.device)
      .set('use_firstname', credentials.firstName)
      .set('use_lastname', credentials.lastName)
      .set('use_email', credentials.email)
      .set('use_password', credentials.password)
      .set('use_pushtoken', credentials.pushToken)
      .set('use_profilepic', credentials.profilePic)
      .set('use_language', credentials.language)
      .set('use_newsletter', credentials.newsletter);

    return this.httpService.post(API.url.signUp, body, { headers })
      .map((res) => {
        return res;
      });
  }

  public login(credentials) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_email', credentials.email)
      .set('use_password', credentials.password);

    return this.httpService.post(API.url.signIn, body, { headers })
      .map((res) => {
        return res;
      });
  }

  public resetPassword(credentials) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_email', credentials.email);

    return this.httpService.post(API.url.resetPassword, body, { headers })
      .map((res) => {
        return res;
      });
  }
}
