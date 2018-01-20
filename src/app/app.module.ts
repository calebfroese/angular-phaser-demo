import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollidableDirective } from '../directives/collidable.directive';
import { HomeComponent } from '../home/home.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { GameService } from '../services/game.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule],
  declarations: [
    HomeComponent,
    PortfolioComponent,
    AppComponent,
    CollidableDirective,
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
