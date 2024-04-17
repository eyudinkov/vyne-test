import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpCancelService } from './cancel.service';

import { LoginActions } from '@core/state/actions/auth';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<any>,
    private httpCancelService: HttpCancelService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          this.httpCancelService.cancelPendingRequests();
          this.store.dispatch(LoginActions.logout());
        }
        return throwError(() => response);
      })
    );
  }
}
