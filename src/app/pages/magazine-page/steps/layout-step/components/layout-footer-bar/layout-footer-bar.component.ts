import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '@photobook/state-service';

@Component({
  selector: 'pb-layout-footer-bar',
  templateUrl: './layout-footer-bar.component.html',
  styleUrls: ['./layout-footer-bar.component.scss']
})
export class LayoutFooterBarComponent implements OnInit {
  @Input() files;
  @Output() nextStep: EventEmitter<any> = new EventEmitter();
  @Output() prevStep: EventEmitter<any> = new EventEmitter();

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  next() {
    this.stateService.changeStep(1);
  }

  prev() {
    this.stateService.changeStep(-1);
  }
}
