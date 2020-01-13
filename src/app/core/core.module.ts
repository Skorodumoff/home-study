import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './services/user.service';
import {NotificationService} from './notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [UserService, NotificationService]
})
export class CoreModule { }
