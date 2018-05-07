import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxNotificationModule } from 'ngx-notification';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxNotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
