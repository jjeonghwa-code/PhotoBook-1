import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '@photobook/common-service';
import { UploadStateService } from '../../services/upload-state.service';

@Component({
  selector: 'pb-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
    private uploadStateService: UploadStateService,
    public commonService: CommonService,
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

  enableNext() {
    return this.uploadStateService.getTotalPortraitCounts() >= 2
          && this.uploadStateService.getFileLength() >= 36
          && this.uploadStateService.getFileLength() <= 100;
  }

  next() {
    if (this.enableNext()) {
      this.router.navigate(['/magazine/create/step2']);
    }
  }
}
