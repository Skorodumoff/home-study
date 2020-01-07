import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageListLayoutComponent} from './message-list-layout/message-list-layout.component';
import {EditMessageLayoutComponent} from './edit-message-layout/edit-message-layout.component';
import {MessagesRoutingModule} from './messages-routing.module';

@NgModule({
  declarations: [
    MessageListLayoutComponent,
    EditMessageLayoutComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule {
}
