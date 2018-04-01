import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { UserLoginCredentials } from '../models/user-login-credentials';
import { UserService } from '../services/user.service';
import { ProfilePageComponent } from './profile-page.component';

@Component({selector: 'app-profile-form', template: ''})
class StubProfileFormComponent {}

const userServiceStub = {
  getUser(): Observable<UserLoginCredentials> {
    return Observable.of(new UserLoginCredentials());
  }
};

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfilePageComponent,
        StubProfileFormComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: UserService, useValue: userServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "Profile"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Profile');
  });

  xit('should input the user object into the child form', () => {
    expect(false).toBeTruthy();
  });
});
