import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MessageListLayoutComponent} from './message-list-layout/message-list-layout.component';
import {EditMessageLayoutComponent} from './edit-message-layout/edit-message-layout.component';

const routes: Routes = [
  {path: '', component: MessageListLayoutComponent},
  {path: ':id', component: EditMessageLayoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {
}
