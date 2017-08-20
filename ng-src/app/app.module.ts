import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import * as Raven from 'raven-js';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../environments/environment';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

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
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    TopNavBarComponent,
    ProfilePageComponent,
    LoginFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
