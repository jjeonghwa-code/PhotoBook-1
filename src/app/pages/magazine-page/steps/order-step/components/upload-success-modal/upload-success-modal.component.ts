import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '@photobook/common-service';

@Component({
  selector: 'pb-upload-success-modal',
  templateUrl: './upload-success-modal.component.html',
  styleUrls: ['./upload-success-modal.component.scss']
})
export class UploadSuccessModalComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<UploadSuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ok() {
    this.dialogRef.close(true);
  }
}
