import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import * as WebFont from 'webfontloader';

declare let $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Django Angular Boilerplate';
  url = 'http://localhost:8000/api/';
  apiResponse;

  constructor(private http: Http) { }

  ngOnInit() {
    console.log('AppComponent initializing...');
    $(document).foundation();

    WebFont.load({
      google: {
      families: ['Open+Sans']
      }
    });


    this.getApi();
  }

  public getApi() {
    this.http.get(this.url).toPromise().then((res) => {
      this.apiResponse = res;
      console.log(res);
    });
  }
}
