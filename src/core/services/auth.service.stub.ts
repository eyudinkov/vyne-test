import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { Login } from '@core/state/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceStub {
  public login(_data: Login): Observable<never> {
    return EMPTY;
  }
}
