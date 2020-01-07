import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'log-in', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'messages', loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)},
  {path: '**', redirectTo: '/messages'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
