import { Component, OnInit } from '@angular/core';
import { UploadStateService } from './services/upload-state.service';
import { StateService } from '@photobook/state-service';
import { PhotoEditModalComponent } from './components/photo-edit-modal/photo-edit-modal.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'pb-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.scss']
})
export class UploadStepComponent implements OnInit {

  magazine$ = this.stateService.magazine$;

  constructor(
    public dialog: MatDialog,
    private uploadStateService: UploadStateService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.getPhotos();
  }

  async getPhotos() {
    await this.uploadStateService.getPhotos().toPromise();
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

}
