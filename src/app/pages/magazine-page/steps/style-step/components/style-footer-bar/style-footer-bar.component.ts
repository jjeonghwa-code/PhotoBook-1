import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '@photobook/state-service';

@Component({
  selector: 'pb-style-footer-bar',
  templateUrl: './style-footer-bar.component.html',
  styleUrls: ['./style-footer-bar.component.scss']
})
export class StyleFooterBarComponent implements OnInit {
  @Input() files;
  @Output() nextStep: EventEmitter<any> = new EventEmitter();
  @Output() prevStep: EventEmitter<any> = new EventEmitter();

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
  }

  next() {
    this.nextStep.emit();
  }

  prev() {
    this.prevStep.emit();
  }
}
