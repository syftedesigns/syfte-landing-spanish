/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgwWowModule } from 'ngx-wow';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Components */
import { AppComponent } from './app.component';
import { PagesComponent } from './components/pages.component';
// Routing page
import { SYFTE_ROUTES } from './app.routes';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StaticModule } from './components/static/static.module';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgwWowModule,
    RouterModule,
    SYFTE_ROUTES,
    StaticModule,
    ServicesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
