import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { en_GB } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { enGB as EN } from 'date-fns/locale';
import { NZ_DATE_CONFIG } from 'ng-zorro-antd/i18n';

import en from '@angular/common/locales/en';

import { AuthEffects, PaymentsEffects } from '@core/state/effects';
import { ROOT_REDUCER, metaReducers } from '@core/state/reducers';

import {
  HttpCancelInterceptor,
  TokenInterceptor,
  ErrorInterceptor,
  EventBusService,
} from '@core/services';

import { MainLayoutModule } from '@core/modules/main-layout/main-layout.module';
import { AuthModule } from './auth/auth.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    MainLayoutModule,
    NzMessageModule,
    StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers,
    }),
    EffectsModule.forRoot([AuthEffects, PaymentsEffects]),
  ],
  providers: [
    EventBusService,
    {
      provide: NZ_I18N,
      useValue: en_GB,
    },
    {
      provide: NZ_DATE_LOCALE,
      useValue: EN,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCancelInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: NZ_DATE_CONFIG,
      useValue: {
        firstDayOfWeek: 1,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
