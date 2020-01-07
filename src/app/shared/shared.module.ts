import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, UserPanelComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
