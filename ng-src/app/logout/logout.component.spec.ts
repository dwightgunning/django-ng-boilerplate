import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterStub } from '../../testing/router-stubs';
import { AuthService } from '../services/auth.service';
import { LogoutComponent } from './logout.component';

class AuthServiceSpy {
  logout = jasmine.createSpy('logout').and.callFake(
    () => Promise
      .resolve(true)
  );
}

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LogoutComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceSpy },
        // {provider: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
  }));

  let authServiceSpy: AuthServiceSpy;
  let router: RouterStub;
  let routerNavigateSpy;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    authServiceSpy = fixture.debugElement.injector.get(AuthService) as any;
    router = fixture.debugElement.injector.get(Router) as any;
    routerNavigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout and navigates', () => {
    expect(authServiceSpy.logout.calls.count()).toBe(1, 'logout called once');

    const navArgsName = routerNavigateSpy.calls.first().args[0][0];
    expect(navArgsName).toBe('/', 'should nav to "/"');
  });
});
