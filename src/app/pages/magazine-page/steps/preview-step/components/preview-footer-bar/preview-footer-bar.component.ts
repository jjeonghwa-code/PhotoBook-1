import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pb-preview-footer-bar',
  templateUrl: './preview-footer-bar.component.html',
  styleUrls: ['./preview-footer-bar.component.scss']
})
export class PreviewFooterBarComponent implements OnInit {
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
