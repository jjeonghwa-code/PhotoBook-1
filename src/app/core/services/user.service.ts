import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '@photobook/core/consts/api';
import { StateService } from '@photobook/state-service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private stateService: StateService
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
    return this.http.post(API.url.signIn, body, {headers: headers})
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.stateService.userInfo = res;
          }
        })
      );
  }

  resetPassword(credentials) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_email', credentials.email);
    return this.http.post(API.url.resetPassword, body, {headers: headers});
  }

  updateProfile(data) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_actiecode', data.use_actiecode)
      .set('use_device_info', data.use_device_info)
      .set('use_gender', data.use_gender)
      .set('use_guid', data.use_guid)
      .set('use_firstname', data.use_firstname)
      .set('use_lastname', data.use_lastname)
      .set('use_email', data.use_email)
      .set('use_password', data.use_password)
      .set('use_street', data.use_street)
      .set('use_housenumber', data.use_housenumber)
      .set('use_housenumbersuffix', data.use_housenumbersuffix)
      .set('use_dateofbirth', data.use_dateofbirth)
      .set('use_postalcode', data.use_postalcode)
      .set('use_city', data.use_city)
      .set('use_countryId', data.use_countryId)
      .set('use_phonenumber', data.use_phonenumber)
      .set('use_newsletter', data.use_newsletter);
    return this.http.post(API.url.setUserDetails, body, {headers: headers});
  }

  getUserDetails() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.stateService.userInfo.use_guid);
    return this.http.post(API.url.getUserDetails, body, {headers: headers})
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.stateService.userInfo = _.merge(this.stateService.userInfo, res);
          }
        })
      );
  }

  getSubscriptionList() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.stateService.userInfo.use_guid);
    return this.http.post(API.url.getSubscriptionList, body, {headers: headers});
  }

  getAddressInfo(data) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('postal_code', data.postalCode)
      .set('number', data.houseNumber);
    return this.http.post(API.url.getAddressInfo, body, {headers: headers});
  }
}
