import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pb-border-thickness-selector',
  templateUrl: './border-thickness-selector.component.html',
  styleUrls: ['./border-thickness-selector.component.scss']
})
export class BorderThicknessSelectorComponent implements OnInit {

  @Input() thickness = 1;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  changeThickness(e) {
    this.select.emit(e.value);
  }

}
