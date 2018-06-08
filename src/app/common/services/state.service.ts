import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as _ from 'lodash';

export const StateKeys = {
  UserInfo: 'userInfo',
  Magazine: 'magazine',
  Files: 'files'
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  folder_id = 0;
  cloudfolder = null;

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);

  magazine$: BehaviorSubject<any> = new BehaviorSubject<any>(this.magazine);

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  get isLoggedIn() {
    return !!this.localStorageService.get(StateKeys.UserInfo);
  }

  get magazine() {
    return this.localStorageService.get(StateKeys.Magazine) || {};
  }

  set userInfo(user: any) {
    this.localStorageService.set(StateKeys.UserInfo, user);
    this.authChanged();
  }

  get userInfo() {
    return this.localStorageService.get(StateKeys.UserInfo);
  }

  setMagazinePart(key: string, value: any) {
    const source: any = {};
    source[key] = value;
    const magazine = this.magazine;
    _.merge(magazine, source);
    this.localStorageService.set(StateKeys.Magazine, magazine);
    this.magazine$.next(this.magazine);
  }

  authChanged() {
    this.isLoggedIn$.next(this.isLoggedIn);
  }

  clear() {
    this.folder_id = 0;
    this.cloudfolder = null;
    this.localStorageService.clearAll();
    this.isLoggedIn$.next(false);
  }
}
