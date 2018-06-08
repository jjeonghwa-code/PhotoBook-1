import { Component, OnInit } from '@angular/core';
import { UserService } from '@photobook/core/services/user.service';
import { StateService } from '@photobook/state-service';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$ = this.stateService.isLoggedIn$;

  constructor(
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.stateService.clear();
    this.router.navigate(['/login']);
  }

}
