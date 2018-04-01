import { Directive, Input } from '@angular/core';

/* tslint:disable */
@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: string;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

export class RouterStub {
  navigate(path: string) { return path; }
  navigateByUrl(url: string) { return url; }
}
