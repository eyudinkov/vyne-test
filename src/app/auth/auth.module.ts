import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { WrapperFormComponent } from './components/wrapper-form/wrapper-form.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzLayoutModule,
    NzCardModule,
  ],
  declarations: [LoginPageComponent, LoginComponent, WrapperFormComponent],
})
export class AuthModule {}
