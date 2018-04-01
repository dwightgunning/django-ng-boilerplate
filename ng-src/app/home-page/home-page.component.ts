import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

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
    console.log('Get api');
    this.http.get(environment.API_BASE_URL)
      .map((response: Response) => {
        this.apiResponse = JSON.stringify(response);
        console.log(this.apiResponse);
      })
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        throw new Observable(err);
      });
  }

}
