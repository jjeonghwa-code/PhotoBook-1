import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  get isLoggedIn() {
    return !!this.localStorageService.get(StateKeys.UserInfo);
  }

  set userInfo(user: any) {
    this.localStorageService.set(StateKeys.UserInfo, user);
    this.authChanged();
  }

  get userInfo() {
    return this.localStorageService.get(StateKeys.UserInfo);
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
