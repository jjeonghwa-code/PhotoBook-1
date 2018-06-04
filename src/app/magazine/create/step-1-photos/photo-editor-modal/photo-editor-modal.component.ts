import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-photo-editor-modal',
  templateUrl: './photo-editor-modal.component.html',
  styleUrls: ['./photo-editor-modal.component.scss']
})
export class PhotoEditorModalComponent implements OnInit {
  currentFileIndex: number;

  constructor(
    public dialogRef: MatDialogRef<PhotoEditorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(123321, this.data);
    this.currentFileIndex = this.data.currentFile.weight;
  }

  prevPhoto() {
    if (this.currentFileIndex > 0) {
      this.currentFileIndex--;
    }
  }

  nextPhoto() {
    if (this.currentFileIndex < this.data.files.length - 1) {
      this.currentFileIndex++;
    }
  }
}
