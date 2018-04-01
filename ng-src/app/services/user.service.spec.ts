import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { UserService } from './user.service';


describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AuthService,
        UserService
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
