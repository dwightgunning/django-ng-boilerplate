import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  apiResponse;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('Initialising the homepage');
    this.getApi();
  }

  private getApi() {
    this.http.get(environment.API_BASE_URL).subscribe(
      (response: Response) => {
        this.apiResponse = JSON.stringify(response);
      }
    );
  }

}
