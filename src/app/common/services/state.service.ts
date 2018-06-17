import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as _ from 'lodash';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '@photobook/core/consts/api';
import { map } from 'rxjs/operators';

export const StateKeys = {
  UserInfo: 'userInfo',
  Magazine: 'magazine',
  Files: 'files'
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

  user_id = -1;
  folder_id = 0;
  cloudfolder = null;

  magazine: any = {};

  files: any[] = []; // top layer
  tempFiles: any[] = []; // second layer

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);

  magazine$: BehaviorSubject<any> = new BehaviorSubject<any>(this.magazine);

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
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

  refreshState(files, storage) {
    this.files = JSON.parse(JSON.stringify(JSON.parse(storage).files));
    // this.files = JSON.parse(JSON.stringify(files));
    this.localStorageService.set(StateKeys.Magazine, JSON.parse(storage));
    this.tempFiles = JSON.parse(JSON.stringify(JSON.parse(storage).files));
    // this.tempFiles = JSON.parse(JSON.stringify(files));
    this.saveFileToStorage();
    this.tempFileListChanged();
  }

  updateTempList(item, index = -1) {
    if (index > -1) {
      this.tempFiles[index] = item;
      this.files[index] = item;
      this.saveFileToStorage();
    } else {
      this.tempFiles.push(item);
      this.files.push(new StorageFileInfo());
    }
    this.tempFileListChanged();
  }

  tempFileListChanged() {
    this.magazine$.next({files: this.tempFiles});
  }

  deleteFile(file) {
    const index = this.files.findIndex(x => x.id === file.id);
    this.files.splice(index, 1);
    this.tempFiles.splice(index, 1);
    this.saveFileToStorage();
    this.tempFileListChanged();
  }

  deleteAllFiles() {
    this.files = [];
    this.tempFiles = [];
    this.saveFileToStorage();
    this.tempFileListChanged();
  }

  replaceFile(oldFile, newfile) {
    const index = this.files.findIndex(x => x.id === oldFile.id);
    const newItem = new StorageFileInfo();
    newItem.buildFileInfoFromImage(newfile, oldFile.weight);
    this.files[index] = newItem;
    this.tempFiles[index] = newItem;
    this.saveFileToStorage();
    this.tempFileListChanged();
  }

  setMagazinePart(key: string, value: any) {
    const store = this.localStorageService.get(StateKeys.Magazine) as string;
    const magazine = store ? JSON.parse(JSON.stringify(store)) : {};
    magazine[key] = value;
    this.localStorageService.set(StateKeys.Magazine, magazine);
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

  saveMood(file, mood) {
    const index = this.tempFiles.findIndex(x => x.id === file.imgID);
    this.tempFiles[index].mood = mood;
    this.files[index].mood = mood;
    this.saveFileToStorage();
    this.tempFileListChanged();
  }

  private async saveFileToStorage() {
    this.setMagazinePart('files', this.files);
    const currentStorage = this.localStorageService.get(StateKeys.Magazine);
    await this.setStorage(JSON.stringify(currentStorage)).toPromise();
  }

  // Interacting with backend
  getStorage() {
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('use_guid', this.userInfo.use_guid);
    return this.http.post(API.url.getStorage, body, {headers}).pipe(map((x: any) => {
      x.strMagazine = x.strMagazine.replace(/\\/g, '');
      x.strMagazineCurrent = x.strMagazine.replace(/\\/g, '');
      return x;
    }));
  }

  setStorage(storage: string) {
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.userInfo.use_guid)
      .set('storageMagazine', storage)
      .set('storageCurrent', storage);
    return this.http.post(API.url.setStorage, body, {headers});
  }
}
