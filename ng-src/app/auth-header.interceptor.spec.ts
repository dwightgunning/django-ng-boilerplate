import { HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthHeaderInterceptor } from './auth-header.interceptor';

describe('AuthHeaderInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthHeaderInterceptor,
      ]
    });
  });

  it('should have tests', inject([AuthHeaderInterceptor], (interceptor: AuthHeaderInterceptor) => {
    expect(interceptor).toBeTruthy();
  }));
});
