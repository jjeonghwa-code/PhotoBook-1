import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CoverStateService } from '../../services/cover-state.service';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';

@Component({
  selector: 'pb-cover-photo-select-modal',
  templateUrl: './cover-photo-select-modal.component.html',
  styleUrls: ['./cover-photo-select-modal.component.scss']
})
export class CoverPhotoSelectModalComponent implements OnInit {

  files: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CoverPhotoSelectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public coverStateService: CoverStateService
  ) { }

  ngOnInit() {
    this.files = this.coverStateService.getPortraitImages();
  }

  selectCoverImage(file: StorageFileInfo) {
    this.coverStateService.setCoverImage(file);
    this.dialogRef.close();
  }
}
