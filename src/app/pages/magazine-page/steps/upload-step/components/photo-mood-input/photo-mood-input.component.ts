import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mood, TextAlign, TextWrapperStyle } from '@photobook/core/models/mood';

@Component({
  selector: 'pb-photo-mood-input',
  templateUrl: './photo-mood-input.component.html',
  styleUrls: ['./photo-mood-input.component.scss']
})
export class PhotoMoodInputComponent implements OnInit {

  @Input() mood: Mood = new Mood();
  @Output() selectStyle: EventEmitter<any> = new EventEmitter<any>();

  maxLength = 110;
  TextAlign = TextAlign;
  TextWrapperStyle = TextWrapperStyle;

  fonts = [
    'San Francisco Bold',
    'San Francisco Medium',
    'San Francisco',
    'San Francisco Semi Bold',
    'San Francisco Thin',
    'San Francisco Ultra Light',
    'AlexBrush',
    'Caviar Dreams',
    'GrandHotel',
    'Helvetica',
    'LobsterTwo',
    'Pacifico',
    'Raleway',
    'SeasideResortNF',
    'Windsong',
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


