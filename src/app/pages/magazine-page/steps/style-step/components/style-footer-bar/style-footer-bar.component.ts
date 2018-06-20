import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pb-style-footer-bar',
  templateUrl: './style-footer-bar.component.html',
  styleUrls: ['./style-footer-bar.component.scss']
})
export class StyleFooterBarComponent implements OnInit {
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
