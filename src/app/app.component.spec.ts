import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MainLayoutModule } from '@core/modules/main-layout';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCER, metaReducers } from '@core/state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, PaymentsEffects } from '@core/state/effects';
import { HttpClientModule } from '@angular/common/http';

import { EventBusService } from '@core/services';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        MainLayoutModule,
        StoreModule.forRoot(ROOT_REDUCER, {
          metaReducers,
        }),
        EffectsModule.forRoot([AuthEffects, PaymentsEffects]),
        HttpClientModule,
      ],
      declarations: [AppComponent],
      providers: [EventBusService],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
