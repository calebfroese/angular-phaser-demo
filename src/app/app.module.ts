import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent, ToolbarComponent],
})
export class AppModule {}
