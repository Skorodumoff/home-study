import {Routes, RouterModule} from '@angular/router';
import {LogInLayoutComponent} from './log-in-layout/log-in-layout.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', component: LogInLayoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
