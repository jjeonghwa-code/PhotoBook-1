import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../../../shared/services';

@Component({
  selector: 'app-photo-editor-modal',
  templateUrl: './photo-editor-modal.component.html',
  styleUrls: ['./photo-editor-modal.component.scss']
})
export class PhotoEditorModalComponent implements OnInit {
  currentFileIndex: number;

  base64Image: any;
  croppedImage: any = '';
  cropperReady = false;

  imageCropped(image: string) {
      this.croppedImage = image;
  }
  imageLoaded() {
      // show cropper
      this.cropperReady = true;
  }
  loadImageFailed() {
      // show message
      console.log('Load failed');
  }

  getBase64Image() {
    this.commonService.imgUrlToBase64Data(this.data.files[this.currentFileIndex].url, (myBase64) => {
      this.base64Image = myBase64;
    });
  }

  constructor(
    public dialogRef: MatDialogRef<PhotoEditorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commonService: CommonService
  ) { }

  ngOnInit() {
    console.log(123321, this.data);
    this.currentFileIndex = this.data.currentFile.weight;
    // this.getBase64Image();
  }

  prevPhoto() {
    if (this.currentFileIndex > 0) {
      this.currentFileIndex--;
      // this.getBase64Image();
    }
  }

  nextPhoto() {
    if (this.currentFileIndex < this.data.files.length - 1) {
      this.currentFileIndex++;
      // this.getBase64Image();
    }
  }
}
