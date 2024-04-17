import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Params } from '../state/models/params';
import { PaymentTransactions } from '../state/models/payments';

import { API_BASE } from '../../app/api-base';

import { createHttpParams } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  public getTransactionsList(
    requestParameters: Params | Record<string, unknown>
  ): Observable<PaymentTransactions> {
    const {
      page = 0,
      size = 5,
      status,
      createdAtStart,
      createdAtEnd,
    } = requestParameters;

    const params = createHttpParams({
      page,
      size,
      status,
      createdAtStart,
      createdAtEnd,
    });

    return this.http.get<PaymentTransactions>(`${API_BASE}/api/v1/payments`, {
      params,
    });
  }
}
