import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE } from '../../app/api-base';
import { StorageService } from '@core/services';

import { getToken } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public login(token: string): Observable<string> {
    return this.http
      .get(`${API_BASE}/swagger-ui/`, {
        responseType: 'text',
        headers: new HttpHeaders({
          'Content-Type': 'text/plain',
          Authorization: 'Basic ' + token,
        }),
      })
      .pipe(
        map(() => {
          return token;
        })
      );
  }

  public isAuthenticated(): boolean {
    return !!getToken(this.storageService.getItem('auth'));
  }
}
