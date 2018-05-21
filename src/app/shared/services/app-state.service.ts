import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

export const StateKeys = {
  User: 'user',
  Magazine: 'magazine'
};

@Injectable()
export class AppStateService {

  constructor(private localStorageService: LocalStorageService) { }

  set user(user: any) {
    this.localStorageService.set(StateKeys.User, user);
  }

  get user() {
    return this.localStorageService.get(StateKeys.User);
  }

  set magazine(magazine) {
    this.localStorageService.set(StateKeys.Magazine, magazine);
  }

  get magazine() {
    return this.localStorageService.get(StateKeys.Magazine);
  }
}
