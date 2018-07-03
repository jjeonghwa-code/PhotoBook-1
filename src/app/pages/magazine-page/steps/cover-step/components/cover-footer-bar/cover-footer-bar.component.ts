import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '@photobook/state-service';
import { Magazine } from '@photobook/core/models/magazine';

@Component({
  selector: 'pb-cover-footer-bar',
  templateUrl: './cover-footer-bar.component.html',
  styleUrls: ['./cover-footer-bar.component.scss']
})
export class CoverFooterBarComponent implements OnInit {
  @Input() files;
  @Output() nextStep: EventEmitter<any> = new EventEmitter();
  @Output() prevStep: EventEmitter<any> = new EventEmitter();

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    const magazine = this.stateService.getMagazine();
    this.test(magazine);
    console.log(this.test(magazine));
  }

  next() {
    this.stateService.changeStep(1);
  }

  prev() {
    this.stateService.changeStep(-1);
  }

  test(magazine: Magazine) {

  }
}
