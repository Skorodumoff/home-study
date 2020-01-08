import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import {RouterModule} from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [HeaderComponent, UserPanelComponent, NotificationComponent],
  exports: [
    HeaderComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
