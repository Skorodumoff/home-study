import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LogInLayoutComponent} from './log-in-layout/log-in-layout.component';

@NgModule({
  declarations: [
    LogInLayoutComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
