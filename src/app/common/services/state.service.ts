import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as _ from 'lodash';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '@photobook/core/consts/api';
import { map } from 'rxjs/operators';
import { MagazineProd } from '@photobook/core/models/magazine-prod';
import { Magazine } from '@photobook/core/models/magazine';

export const StateKeys = {
  UserInfo: 'userInfo',
  Magazine: 'magazine',
  CurrentMagazine: 'currentMagazine',
  Files: 'files'
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  isDateAscending = false;
  isNameAscending = false;

  user_id = -1;
  folder_id = 0;
  cloudfolder = null;
  magazine: any = {};
  files: any[] = []; // top layer
  tempFiles: any[] = []; // second layer

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);
  magazine$: BehaviorSubject<any> = new BehaviorSubject<any>(this.magazine);

  isGenerated = false;
  selectedLayoutOption = 0;

  magazineJSON: any = [];

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

  getFileById(id) {
    const magazine: Magazine = this.getMagazine();
    return magazine.files.find(x => x.id === id);
  }

  refreshState(files, storage) {
    if (storage) {
      if (JSON.parse(storage).files.length === files.length) {
        this.files = JSON.parse(JSON.stringify(JSON.parse(storage).files));
        this.tempFiles = JSON.parse(JSON.stringify(JSON.parse(storage).files));
      } else {
        this.files = JSON.parse(JSON.stringify(files));
        this.tempFiles = JSON.parse(JSON.stringify(files));
      }
    } else {
      this.files = JSON.parse(JSON.stringify(files));
      this.tempFiles = JSON.parse(JSON.stringify(files));
    }
    this.setMagazinePart('files', this.files);
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

  markFileAsFailed(index) {
    this.files[index].isFailed = true;
    this.files.splice(index, 1);
    this.tempFiles.splice(index, 1);
    this.tempFileListChanged();
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
    this.isGenerated = false;
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

  async saveCurrentMagazine(currentMagazine) {
    this.localStorageService.set(StateKeys.CurrentMagazine, currentMagazine);
    const currentStorage = this.localStorageService.get(StateKeys.Magazine);
    const currMagazine = this.localStorageService.get(StateKeys.CurrentMagazine);
    await this.setStorage(JSON.stringify(currentStorage), JSON.stringify(currMagazine)).toPromise();
  }

  get currentMagazine(): any {
    return this.localStorageService.get(StateKeys.CurrentMagazine);
  }

  sortByDate() {
    this.isDateAscending = !this.isDateAscending;
    const files = JSON.parse(JSON.stringify(this.files));
    files.sort((a, b) => {
      const valueA = parseInt(a.weight, 10);
      const valueB = parseInt(b.weight, 10);

      return this.isDateAscending ? valueA > valueB ? -1 : valueA === valueB ? 0 : 1
      : valueA > valueB ? 1 : valueA === valueB ? 0 : -1;
    });
    this.files = JSON.parse(JSON.stringify(files));
    this.tempFiles = JSON.parse(JSON.stringify(files));
    this.saveFileToStorage();
    this.tempFileListChanged();
  }

  sortByName() {
    this.isNameAscending = !this.isNameAscending;
    const files = JSON.parse(JSON.stringify(this.files));
    files.sort((a, b) => {
      const valueA = parseInt(a.name, 10);
      const valueB = parseInt(b.name, 10);

      return this.isNameAscending ? valueA > valueB ? -1 : valueA === valueB ? 0 : 1
      : valueA > valueB ? 1 : valueA === valueB ? 0 : -1;
    });
    this.files = JSON.parse(JSON.stringify(files));
    this.tempFiles = JSON.parse(JSON.stringify(files));
    this.saveFileToStorage();
    this.tempFileListChanged();
  }

  getMagazine() {
    return this.localStorageService.get(StateKeys.Magazine);
  }

  private async saveFileToStorage() {
    const files = this.files.filter(x => !x.isFailed);
    this.setMagazinePart('files', files);
    this.sendStorageToBackend();
  }

  async sendStorageToBackend() {
    const currentStorage = this.localStorageService.get(StateKeys.Magazine);
    const currentMagazine = this.localStorageService.get(StateKeys.CurrentMagazine);
    await this.setStorage(JSON.stringify(currentStorage), JSON.stringify(currentMagazine)).toPromise();
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

  setStorage(storage: string, currentMagazine: string) {
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('use_guid', this.userInfo.use_guid)
      .set('storageMagazine', storage)
      .set('storageCurrent', currentMagazine);
    return this.http.post(API.url.setStorage, body, {headers});
  }
}
