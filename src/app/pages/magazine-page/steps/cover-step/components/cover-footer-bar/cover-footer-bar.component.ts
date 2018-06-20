import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pb-cover-footer-bar',
  templateUrl: './cover-footer-bar.component.html',
  styleUrls: ['./cover-footer-bar.component.scss']
})
export class CoverFooterBarComponent implements OnInit {
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
