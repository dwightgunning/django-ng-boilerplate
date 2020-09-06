import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { RouterLinkStubDirective } from '../../testing/router-stubs';
import { UserLoginCredentials } from '../models/user-login-credentials';
import { AuthService } from '../services/auth.service';
import { TopNavBarComponent } from './top-nav-bar.component';

const authServiceStub = {
  getUserLoginCredentials(): Observable<UserLoginCredentials> {
    return of(null);
  }
};

describe('TopNavBarComponent', () => {
  let component: TopNavBarComponent;
  let fixture: ComponentFixture<TopNavBarComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        TopNavBarComponent,
        RouterLinkStubDirective
      ],
      imports: [],
      providers: [
        {provide: AuthService, useValue: authServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavBarComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display login link when unauthenticated', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    // find DebugElements with an attached RouterLinkStubDirective
    const linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    const links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('', '1st link should go to Home');
    expect(links[1].linkParams).toBe('login', '2nd link should go to Login');
  });

  it('should display logout link when authenticated', () => {
    const authService = fixture.debugElement.injector.get(AuthService) as any;
    authService.getUserLoginCredentials =
      (): Observable<UserLoginCredentials> => of(new UserLoginCredentials());
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    const linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    const links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(links.length).toBe(3, 'should have 2 links (home, profile, logout)');
    expect(links[0].linkParams).toBe('', '1st link should go to Home');
    expect(links[1].linkParams).toBe('profile', '4th link should go to Profile');
    expect(links[2].linkParams).toBe('logout', '5th link should go to Logout');
  });
});
