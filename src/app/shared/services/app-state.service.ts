import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

export const StateKeys = {
  UserInfo: 'userInfo',
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
}
