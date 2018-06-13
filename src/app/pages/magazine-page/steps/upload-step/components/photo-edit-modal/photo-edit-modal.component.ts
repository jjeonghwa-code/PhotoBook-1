import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { UploadStateService } from '../../services/upload-state.service';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'pb-photo-edit-modal',
  templateUrl: './photo-edit-modal.component.html',
  styleUrls: ['./photo-edit-modal.component.scss']
})
export class PhotoEditModalComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild(ImageCropperComponent) cropper: ImageCropperComponent;

  currentIndex = 0;

  originbase64Image: any = '';
  tempbase64Image: any = '';

  rotate = 0;
  isSliding = false;
  tempCrop = {x1: 50, y1: 50, x2: 150, y2: 150};

  cropRatio = 4 / 3;


  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadStateService: UploadStateService
  ) { }

  ngOnInit() {
    this.currentIndex = this.data.index;
    this.readImageAsBase64(this.data.file.url);
  }

  async readImageAsBase64(fileUrl) {
    this.originbase64Image = await this.uploadStateService.readUrlAsBase64(fileUrl);
    this.tempbase64Image = this.originbase64Image;
  }

  async rotateImage(deg) {
    const img = new Image();
    img.src = this.originbase64Image;
    const canvas = (<HTMLCanvasElement>this.canvas.nativeElement);
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d');
    context.translate(img.width / 2, img.height / 2);
    context.clearRect(-2000, -2000, 5000, 5000);
    context.save();
    context.rotate(deg * Math.PI / 180);
    context.drawImage(img, -img.width / 2, -img.height / 2);
    context.restore();
    this.tempbase64Image = canvas.toDataURL();
  }

  imageCropped(image: string) {
    // console.log(this.cropper.cropper);
  }
  imageLoaded(e) {
    // show cropper
  }
  slideImage(value) {
    this.currentIndex += value;
    const file = this.uploadStateService.getFileByIndex(this.currentIndex);
    this.readImageAsBase64(file.url);
  }

  sliding(e) {
    this.isSliding = true;
    this.rotate = e.value;
  }

  rotateChange(e) {
    this.isSliding = false;
    this.rotateImage(this.rotate);
  }

  changeMood(e) {
    console.log(e);
  }

}
