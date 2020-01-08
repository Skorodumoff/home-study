import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageListPageComponent} from './containers/message-list-page/message-list-page.component';
import {EditMessagePageComponent} from './containers/edit-message-page/edit-message-page.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {SharedModule} from '../shared/shared.module';
import { MessageGridComponent } from './components/message-grid/message-grid.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MessageService} from './services/message.service';

@NgModule({
  declarations: [
    MessageListPageComponent,
    EditMessagePageComponent,
    MessageGridComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule
  ],
  providers: [
    MessageService
  ]
})
export class MessagesModule {
}
