import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

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

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  set userInfo(user: any) {
    this.localStorageService.set(StateKeys.UserInfo, user);
  }

  get userInfo() {
    return this.localStorageService.get(StateKeys.UserInfo);
  }
}
