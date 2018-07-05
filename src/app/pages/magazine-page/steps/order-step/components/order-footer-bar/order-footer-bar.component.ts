import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '@photobook/state-service';
import { Magazine } from '@photobook/core/models/magazine';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-order-footer-bar',
  templateUrl: './order-footer-bar.component.html',
  styleUrls: ['./order-footer-bar.component.scss']
})
export class OrderFooterBarComponent implements OnInit {
  @Input() files;
  @Input() disabled = false;
  @Output() nextStep: EventEmitter<any> = new EventEmitter();
  @Output() prevStep: EventEmitter<any> = new EventEmitter();

  constructor(
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit() {
    const magazine = this.stateService.getMagazine();
    this.test(magazine);
  }

  next() {
    this.nextStep.emit();
  }

  prev() {
    this.prevStep.emit();
  }

  test(magazine: Magazine) {

  }
}
