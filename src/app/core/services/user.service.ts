import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '@photobook/core/consts/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(credentials: any) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
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
    return this.http.post(API.url.signUp, body, {headers: headers});
  }

  login(credentials) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_email', credentials.email)
      .set('use_password', credentials.password);
    return this.http.post(API.url.signIn, body, {headers: headers});
  }

  resetPassword(credentials) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_email', credentials.email);
    return this.http.post(API.url.resetPassword, body, {headers: headers});
  }
}
