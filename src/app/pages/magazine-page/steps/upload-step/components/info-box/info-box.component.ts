import { Component, OnInit } from '@angular/core';
import { StateService } from '@photobook/state-service';

@Component({
  selector: 'pb-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.stateService.magazine$.subscribe(magazine => {
      console.log(magazine);
    });
  }

}
