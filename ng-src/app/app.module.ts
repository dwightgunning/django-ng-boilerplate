import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import * as Raven from 'raven-js';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';


Raven
  .config(environment.SENTRY_PUBLIC_DSN)
  .install();

export class RavenErrorHandler implements ErrorHandler {

  handleError(err: any): void {
    Raven.captureException(err);
  }

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
