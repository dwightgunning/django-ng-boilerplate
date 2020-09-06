import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { environment } from '../../environments/environment';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve and display the response from the sample API endpoint', () => {
    const testResponsePayload = {fieldA: "value"};
    const testResponsePayloadStr = JSON.stringify(testResponsePayload);
    fixture.detectChanges();
    const req = httpMock.expectOne(environment.API_BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(testResponsePayload);

    expect(component).toBeTruthy();
    expect(component.apiResponse).toBe(testResponsePayloadStr);
    fixture.detectChanges();

    const componentEl = fixture.debugElement.nativeElement;
    expect(componentEl.querySelector('#sampleApiResponse').textContent).toBe(testResponsePayloadStr);
  });
});
