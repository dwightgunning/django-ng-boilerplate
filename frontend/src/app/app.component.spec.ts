import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';

@Component({selector: 'app-top-nav-bar', template: ''})
class StubTopNavBarComponent {}

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StubTopNavBarComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
      ],
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Django Angular Boilerplate'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Django Angular Boilerplate');
  }));

  xit('should (probably) invoke the auth guard', waitForAsync(() => {
    expect(false).toBeTruthy();
  }));

});
