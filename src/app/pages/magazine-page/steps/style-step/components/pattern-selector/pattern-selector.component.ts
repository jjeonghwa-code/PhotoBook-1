import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum PatternType {
  Pattern_0,
  Pattern_1,
  Pattern_2,
  Pattern_3,
  Pattern_4,
  Pattern_5,
  Pattern_6,
  Pattern_7,
  Pattern_8,
  Pattern_9,
  Pattern_10,
  Pattern_11
}

@Component({
  selector: 'pb-pattern-selector',
  templateUrl: './pattern-selector.component.html',
  styleUrls: ['./pattern-selector.component.scss']
})
export class PatternSelectorComponent implements OnInit {

  @Input() pattern: PatternType = PatternType.Pattern_0;
  @Output() select: EventEmitter<PatternType> = new EventEmitter<PatternType>();

  patternTypes = [
    {
      icon: '/assets/images/patterns_icons/pattern_small_0.png',
      value: PatternType.Pattern_0
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_1.png',
      value: PatternType.Pattern_1
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_2.png',
      value: PatternType.Pattern_2
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_3.png',
      value: PatternType.Pattern_3
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_4.png',
      value: PatternType.Pattern_4
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_5.png',
      value: PatternType.Pattern_5
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_6.png',
      value: PatternType.Pattern_6
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_7.png',
      value: PatternType.Pattern_7
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_8.png',
      value: PatternType.Pattern_8
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_9.png',
      value: PatternType.Pattern_9
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_10.png',
      value: PatternType.Pattern_10
    },
    {
      icon: '/assets/images/patterns_icons/pattern_small_11.png',
      value: PatternType.Pattern_11
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  selectPattern(btn) {
    this.pattern = btn.value;
    this.select.emit(this.pattern);
  }

}
