import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pb-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss']
})
export class ColorSliderComponent implements OnInit {

  @Input() color = '#FFFFFF';
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  colors = [
    '#FFFFFF',
    '#000000',
    '#CBCBCB',
    '#FFF4CA',
    '#FCD08E',
    '#C59B6D',
    '#F5BAC9',
    '#A9D2ED',
    '#B1D6B1',
    '#DCD6BF',
    '#E2001A',
    '#FFDD26',
    '#EF861B',
    '#008A2E',
    '#005C35',
    '#009EE0',
    '#00346A',
    '#E6418D',
    '#673B15',
    '#5C2381'
  ];

  constructor() { }

  ngOnInit() {
  }

  selectColor(value) {
    this.color = value;
    this.select.emit(this.color);
  }

}
