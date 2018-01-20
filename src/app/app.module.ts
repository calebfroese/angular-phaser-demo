import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CollidableDirective } from '../directives/collidable.directive';
import { GameService } from '../services/game.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, CollidableDirective],
  imports: [BrowserModule],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
