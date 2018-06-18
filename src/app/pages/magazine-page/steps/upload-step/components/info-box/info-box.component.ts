import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'pb-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Output() addFiles: EventEmitter<any> = new EventEmitter();

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.addFiles.emit();
  }
}
