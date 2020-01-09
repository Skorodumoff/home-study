import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {LogInPageComponent} from './containers/log-in-page/log-in-page.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LogInPageComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class LoginModule { }
