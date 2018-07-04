import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from '@photobook/state-service';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss']
})
export class FooterBarComponent implements OnInit {
  @Input() files;
  @Output() sortByDate: EventEmitter<any> = new EventEmitter();
  @Output() sortByName: EventEmitter<any> = new EventEmitter();
  @Output() addFiles: EventEmitter<any> = new EventEmitter();
  @Output() deleteAllFiles: EventEmitter<any> = new EventEmitter();
  @Output() nextStep: EventEmitter<any> = new EventEmitter();
  isDateAscending = false;
  isNameAscending = false;

  constructor(
    private stateService: StateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  dateSort() {
    this.isDateAscending = !this.isDateAscending;
    this.sortByDate.emit();
  }

  nameSort() {
    this.isNameAscending = !this.isNameAscending;
    this.sortByName.emit();
  }

  add() {
    this.addFiles.emit();
  }

  deleteAll() {
    this.deleteAllFiles.emit();
  }

  next() {
    this.router.navigate(['/magazine/create/step2']);
  }
}
