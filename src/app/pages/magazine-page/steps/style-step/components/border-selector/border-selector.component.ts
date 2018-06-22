import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum BorderType {
  Border_0,
  Border_1,
  Border_2,
  Border_3,
  Border_4,
  Border_5,
}

@Component({
  selector: 'pb-border-selector',
  templateUrl: './border-selector.component.html',
  styleUrls: ['./border-selector.component.scss']
})
export class BorderSelectorComponent implements OnInit {

  @Input() border: BorderType = BorderType.Border_0;
  @Output() select: EventEmitter<BorderType> = new EventEmitter<BorderType>();

  borderTypes = [
    {
      icon: '/assets/images/borders/border_0_mini.png',
      value: BorderType.Border_0
    },
    {
      icon: '/assets/images/borders/border_1_mini.png',
      value: BorderType.Border_1
    },
    {
      icon: '/assets/images/borders/border_2_mini.png',
      value: BorderType.Border_2
    },
    {
      icon: '/assets/images/borders/border_3_mini.png',
      value: BorderType.Border_3
    },
    {
      icon: '/assets/images/borders/border_4_mini.png',
      value: BorderType.Border_4
    },
    {
      icon: '/assets/images/borders/border_5_mini.png',
      value: BorderType.Border_5
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  selectBorder(border) {
    this.border = border.value;
    this.select.emit(this.border);
  }

}
