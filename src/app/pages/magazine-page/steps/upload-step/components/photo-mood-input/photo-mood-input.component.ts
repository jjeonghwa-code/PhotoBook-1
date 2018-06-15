import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

enum TextAlign {
  Left,
  Center,
  Right
}

enum TextWrapperStyle {
  Type1,
  Type2,
  Type3
}


@Component({
  selector: 'pb-photo-mood-input',
  templateUrl: './photo-mood-input.component.html',
  styleUrls: ['./photo-mood-input.component.scss']
})
export class PhotoMoodInputComponent implements OnInit {

  @Output() selectStyle: EventEmitter<any> = new EventEmitter<any>();

  maxLength = 110;
  TextAlign = TextAlign;
  TextWrapperStyle = TextWrapperStyle;

  mood = {
    text: '',
    font: '',
    align: TextAlign.Left,
    color: '#000000',
    style: {
      bold: false, italic: false, underline: false
    },
    background: {
      style: TextWrapperStyle.Type1,
      transparency: .5,
      color: '#FFFFFF'
    }
  };

  fonts = [
    'Font A',
    'Font B',
    'Font C',
    'Font D',
    'Font E',
    'Font F',
  ];

  constructor() { }

  ngOnInit() {
  }

  changeAlign(value: TextAlign) {
    this.mood.align = value;
    this.selectStyle.emit(this.mood);
  }

  changeStyle(prop) {
    this.mood.style[prop] = !this.mood.style[prop];
    this.selectStyle.emit(this.mood);
  }

  changeTextWrapperStyle(value: TextWrapperStyle) {
    this.mood.background.style = value;
    this.selectStyle.emit(this.mood);
  }

  changeOpacity(value) {
    this.mood.background.transparency = value.value;
    this.selectStyle.emit(this.mood);
  }

  changeColor(value) {
    this.mood.background.color = value;
    this.selectStyle.emit(this.mood);
  }

  changeForeColor(value) {
    this.mood.color = value;
    this.selectStyle.emit(this.mood);
  }
}


