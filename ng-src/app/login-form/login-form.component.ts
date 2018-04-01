import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLoginCredentials } from '../models/user-login-credentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  error = '';
  model = new UserLoginCredentials();

  submitted = false;

  constructor(
    private router: Router,
    private AuthService: AuthService) { }

  ngOnInit() {
  }

  loginFormSubmit() {
    this.submitted = true;
    this.AuthService.login(this.model)
      .subscribe(result => {
                      if (result === true) {
                          this.router.navigate(['/profile']);
                      } else {
                          this.error = 'Username or password is incorrect';
                      }
                  });
  }
}
