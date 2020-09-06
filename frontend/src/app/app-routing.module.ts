import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePageComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
