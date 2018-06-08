import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '@photobook/core/interceptors/http.interceptor';
import { LocalStorageModule } from 'angular-2-local-storage';

import { StateService } from '@photobook/state-service';
import { CommonService } from '@photobook/common-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({storageType: 'localStorage', prefix: 'PHOTOBOOK'}),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    StateService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
