import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

export const StateKeys = {
  User: 'user',
  BankLogin: 'bankLogin',
  Insurances: 'bank',
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

}
