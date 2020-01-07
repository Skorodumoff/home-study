import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MessageListPageComponent} from './containers/message-list-page/message-list-page.component';
import {EditMessagePageComponent} from './containers/edit-message-page/edit-message-page.component';
import {routingConstants} from './constants/routing-constants';

const routes: Routes = [
  {path: '', component: MessageListPageComponent},
  {path: `:${routingConstants.messageIdParamName}`, component: EditMessagePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {
}
