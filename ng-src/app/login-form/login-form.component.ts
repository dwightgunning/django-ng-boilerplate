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
  error: any;
  model = new UserLoginCredentials();
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() { }

  loginFormSubmit() {
    this.submitted = true;
    this.authService.login(this.model).subscribe(
      (response) => {
        this.submitted = false;
        if (response instanceof UserLoginCredentials) {
          this.router.navigate(['/write']);
        } else {
          this.error = response;
        }
      },
      (error) => {
        this.submitted = false;
        this.error = error;
      });
  }
}
