import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageListPageComponent} from './containers/message-list-page/message-list-page.component';
import {EditMessagePageComponent} from './containers/edit-message-page/edit-message-page.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    MessageListPageComponent,
    EditMessagePageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule
  ]
})
export class MessagesModule {
}
