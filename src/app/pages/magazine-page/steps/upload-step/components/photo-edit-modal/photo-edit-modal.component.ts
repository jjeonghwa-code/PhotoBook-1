import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { UploadStateService } from '../../services/upload-state.service';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { createElement } from '@angular/core/src/view/element';

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
  tempCrop = {x1: 0, y1: 0, x2: 0, y2: 0};

  cropRatio = 4 / 3;
  mood = {
    text: '',
    font: '',
    align: 0,
    color: '#000000',
    style: {
      bold: false, italic: false, underline: false
    },
    background: {
      style: 0,
      transparency: .5,
      color: '#FFFFFF'
    }
  };

  get moodHTML() {
    return `
<p style="color: ${this.mood.color};
text-align: ${this.moodTextAlign};
font-style: ${this.mood.style.italic ? 'italic' : ''};
text-decoration: ${this.mood.style.underline ? 'underline' : ''};
background-color: ${this.mood.background.color};
font-weight: ${this.mood.style.bold ? 'bold' : ''};
font-family: ${this.mood.font}">${this.mood.text}</p>`;
  }

  get moodTextAlign() {
    if (this.mood.align === 0) {
      return 'left';
    } else if (this.mood.align === 1) {
      return 'center';
    } else {
      return 'right';
    }
  }

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
    this.drawMood();
  }
  imageLoaded(e) {
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
    this.mood = e;
    this.drawMood();
  }

  drawMood() {
    const cropperEl = (<any>this.cropper).elementRef.nativeElement.getElementsByClassName('cropper')[0];
    const moodEl = document.getElementById('pb-mood-text');

    if (moodEl) {
      moodEl.innerHTML = this.moodHTML;
    } else {
      const moodElement = document.createElement('div');
      moodElement.id = 'pb-mood-text';
      moodElement.innerHTML = this.moodHTML;
      cropperEl.append(moodElement);
    }
  }

}
