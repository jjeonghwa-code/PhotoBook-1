import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

export const StateKeys = {
  UserInfo: 'userInfo',
  Magazine: 'magazine'
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

  set magazine(magazine) {
    this.localStorageService.set(StateKeys.Magazine, magazine);
  }

  get magazine() {
    return this.localStorageService.get(StateKeys.Magazine);
  }
}
