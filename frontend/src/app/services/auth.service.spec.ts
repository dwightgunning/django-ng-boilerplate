import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  xit('should logout when an authenticated user is present', () => {
    expect(false).toBeTruthy();
  });

  xit('should logout when an authenticated user isn not present', () => {
    expect(false).toBeTruthy();
  });
});
