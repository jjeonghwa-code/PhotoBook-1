import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum CoverPosition {
  Bottom,
  Middle,
  Top
}

@Component({
  selector: 'pb-cover-position-selector',
  templateUrl: './cover-position-selector.component.html',
  styleUrls: ['./cover-position-selector.component.scss']
})
export class CoverPositionSelectorComponent implements OnInit {

  @Input() position: CoverPosition = CoverPosition.Bottom;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  CoverPosition = CoverPosition;

  constructor() { }

  ngOnInit() {

  }

  selectPosition(pos: CoverPosition) {
    this.position = pos;
    this.select.emit(this.position);
  }

}
