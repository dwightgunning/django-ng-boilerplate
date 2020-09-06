import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import * as Sentry from '@sentry/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    TopNavBarComponent,
    ProfilePageComponent,
    LoginFormComponent,
    LogoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
