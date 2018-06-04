import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Magazine } from '../models';

export const StateKeys = {
  UserInfo: 'userInfo',
  Magazine: 'magazine',
  Files: 'files'
};

@Injectable()
export class AppStateService {

  constructor(private localStorageService: LocalStorageService) { }

  set userInfo(user: any) {
    this.localStorageService.set(StateKeys.UserInfo, user);
  }

  get userInfo() {
    return this.localStorageService.get(StateKeys.UserInfo);
  }

  set files(files: any[]) {
    this.localStorageService.set(StateKeys.Files, files);
  }

  get files() {
    return this.localStorageService.get(StateKeys.Files);
  }

  set magazine(magazine: any) {
    this.localStorageService.set(StateKeys.Magazine, magazine);
  }

  get magazine() {
    return this.localStorageService.get(StateKeys.Magazine);
  }

  getMagazine(key) {
    if (!this.magazine) {
      this.magazine = {};
    }

    if (this.magazine[key]) {
      return this.magazine[key];
    }

    return false;
  }

  setMagazine(key, value) {
    let magazine = this.magazine;
    if (!this.magazine) {
      this.magazine = {};
      magazine = {};
    }
   
    const source: any = {};
    source[key] = value;
    _.merge(magazine, source);
    this.magazine = magazine;
  }
}
