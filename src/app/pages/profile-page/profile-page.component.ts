import { Component, OnInit } from '@angular/core';
import { StateService } from '@photobook/state-service';

@Component({
  selector: 'pb-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userInfo;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.userInfo = this.stateService.userInfo;
  }

}
