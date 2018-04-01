import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserLoginCredentials } from '../models/user-login-credentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  userLoginCredentials: Observable<UserLoginCredentials>;

  constructor(
    private authService: AuthService) { }

  ngOnInit() {
    this.userLoginCredentials = this.authService.getUserLoginCredentials();
  }

}
