import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

import { getToken } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const token = getToken(this.storageService.getItem('auth'));
      request = request.clone({
        setHeaders: { Authorization: `Basic ${token}` },
      });
    }

    return next.handle(request);
  }
}
