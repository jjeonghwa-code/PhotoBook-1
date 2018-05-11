import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';

@Injectable()
export class HttpIntercepterService implements HttpInterceptor {
constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes('assets/')) {
      const newRequest = req.clone({
        url: `${environment.apiUrl}${req.url}`
    });

      return next.handle(newRequest);
    }

    return next.handle(req);
  }
}
