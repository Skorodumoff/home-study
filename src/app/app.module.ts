import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditMessageLayoutComponent } from './edit-message-page/edit-message-layout/edit-message-layout.component';
import { LogInLayoutComponent } from './log-in-page/log-in-layout/log-in-layout.component';
import { MessageListLayoutComponent } from './message-list-page/message-list-layout/message-list-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    EditMessageLayoutComponent,
    LogInLayoutComponent,
    MessageListLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
