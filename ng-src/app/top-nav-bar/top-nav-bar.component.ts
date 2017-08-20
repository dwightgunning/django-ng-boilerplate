import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private AuthService: AuthService) { }

  ngOnInit() {
  }

  public isAuthenticated(): boolean {
    return this.AuthService.isAuthenticated();
  }

  public logoutUser(): void {
    this.AuthService.logout();
    this.router.navigate(['/']);
  }

}
