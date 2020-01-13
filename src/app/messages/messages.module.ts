import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageListPageComponent} from './containers/message-list-page/message-list-page.component';
import {EditMessagePageComponent} from './containers/edit-message-page/edit-message-page.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {SharedModule} from '../shared/shared.module';
import { MessageGridComponent } from './components/message-grid/message-grid.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MessageService} from './services/message.service';
import {ReactiveFormsModule} from '@angular/forms';
import { MessageFormComponent } from './components/message-form/message-form.component';
import {OnlyLoggedInUsersGuard} from './guards/only-logged-in';
import {MessageTransportService} from './services/message-transport.service';

@NgModule({
  declarations: [
    MessageListPageComponent,
    EditMessagePageComponent,
    MessageGridComponent,
    NavigationComponent,
    MessageFormComponent
  ],
    imports: [
        CommonModule,
        MessagesRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
  providers: [
    MessageService,
    MessageTransportService,
    OnlyLoggedInUsersGuard
  ]
})
export class MessagesModule {
}
