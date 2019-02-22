import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '@photobook/common-service';

@Component({
  selector: 'pb-upload-warning-modal',
  templateUrl: './upload-warning-modal.component.html',
  styleUrls: ['./upload-warning-modal.component.scss']
})
export class UploadWarningModalComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<UploadWarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  continue() {
    this.dialogRef.close(true);
  }
}
