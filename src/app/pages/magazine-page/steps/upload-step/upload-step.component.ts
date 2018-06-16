import { Component, OnInit } from '@angular/core';
import { UploadStateService } from './services/upload-state.service';
import { StateService } from '@photobook/state-service';
import { PhotoEditModalComponent } from './components/photo-edit-modal/photo-edit-modal.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { FileService } from '@photobook/core/services/file.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pb-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.scss']
})
export class UploadStepComponent implements OnInit {

  isLoading = false;
  magazine$ = this.stateService.magazine$;

  constructor(
    public dialog: MatDialog,
    private uploadStateService: UploadStateService,
    private stateService: StateService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getPhotos();
  }

  async getPhotos() {
    await this.uploadStateService.getPhotos().toPromise();
  }

  getMoodString(mood) {
    if (mood) {
      const htmlString = this.uploadStateService.getMoodHtml(mood);
      return this.sanitizer.bypassSecurityTrustHtml(htmlString);
    } else {
      return '';
    }
  }

  deleteFile(file) {
    this.uploadStateService.openDeleteConfirmModal(file);
  }

  editFile(file, index) {
    const dialogRef = this.dialog.open(PhotoEditModalComponent, {
      width: '800px',
      data: { file: file, index: index }
    });
    dialogRef.afterClosed().pipe(filter(x => x)).subscribe(() => {
      // modal close
    });
  }

  async deleteAll() {
    try {
      this.isLoading = true;
      await this.uploadStateService.deletePhotos().toPromise();
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

}
