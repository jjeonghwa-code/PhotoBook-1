import { Component, OnInit } from '@angular/core';
import { StateService } from '@photobook/state-service';

@Component({
  selector: 'pb-magazine-page',
  templateUrl: './magazine-page.component.html',
  styleUrls: ['./magazine-page.component.scss']
})
export class MagazinePageComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.stateService.changeStep();
  }

}
