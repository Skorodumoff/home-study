import {Routes, RouterModule} from '@angular/router';
import {LogInPageComponent} from './containers/log-in-page/log-in-page.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', component: LogInPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
