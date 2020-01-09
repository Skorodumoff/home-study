import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './services/user.service';
import {NotificationService} from './notification.service';
import { CoreHeaderComponent } from './core-header/core-header.component';

@NgModule({
  declarations: [CoreHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CoreHeaderComponent
  ],
  providers: [UserService, NotificationService]
})
export class CoreModule { }
