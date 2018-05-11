import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isOnboarding: boolean;
  partySize: number;
  partySizeOptions: number[];

  constructor(
    private router: Router
  ) {
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes('/home')) {

        } else {

        }
      }
    });
   }

  ngOnInit() {
    this.partySize = 0;
    this.partySizeOptions = [1, 2, 3];
  }

}
