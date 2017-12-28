import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);
  }

}
