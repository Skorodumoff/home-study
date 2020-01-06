import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessageListLayoutComponent} from './message-list-page/message-list-layout/message-list-layout.component';
import {LogInLayoutComponent} from './log-in-page/log-in-layout/log-in-layout.component';
import {EditMessageLayoutComponent} from './edit-message-page/edit-message-layout/edit-message-layout.component';

const routes: Routes = [
  { path: 'log-in', component: LogInLayoutComponent },
  { path: 'messages', component: MessageListLayoutComponent },
  { path: 'messages/:id', component: EditMessageLayoutComponent },
  { path: '**', redirectTo: '/messages' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
