import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pb-layout-footer-bar',
  templateUrl: './layout-footer-bar.component.html',
  styleUrls: ['./layout-footer-bar.component.scss']
})
export class LayoutFooterBarComponent implements OnInit {
  @Input() files;
  @Output() nextStep: EventEmitter<any> = new EventEmitter();
  @Output() prevStep: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  next() {

  }

  prev() {

  }
}
