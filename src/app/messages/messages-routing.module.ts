import {Injectable, NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate} from '@angular/router';
import {MessageListPageComponent} from './containers/message-list-page/message-list-page.component';
import {EditMessagePageComponent} from './containers/edit-message-page/edit-message-page.component';
import {routingConstants} from './constants/routing-constants';
import {OnlyLoggedInUsersGuard} from './guards/only-logged-in';

const routes: Routes = [
  {path: '', component: MessageListPageComponent},
  {
    path: `:${routingConstants.messageIdParamName}`,
    canActivate: [OnlyLoggedInUsersGuard],
    component: EditMessagePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {
}
