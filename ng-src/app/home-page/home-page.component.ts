import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  url = 'http://localhost:8000/api/';
  apiResponse;

  constructor(private http: Http) { }

  ngOnInit() {
    console.log('Initialising the homepage');
    this.getApi();
  }

  private getApi() {
    this.http.get(this.url).toPromise().then((res) => {
      this.apiResponse = res;
      console.log(res);
    });
  }

}
