import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoverStateService } from './services/cover-state.service';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { CoverPosition } from './components/cover-position-selector/cover-position-selector.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CoverPhotoSelectModalComponent } from './components/cover-photo-select-modal/cover-photo-select-modal.component';
import { FrontCover } from '@photobook/core/models/magazine';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-cover-step',
  templateUrl: './cover-step.component.html',
  styleUrls: ['./cover-step.component.scss']
})
export class CoverStepComponent implements OnInit {

  coverForm: FormGroup;
  CoverPosition = CoverPosition;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public coverStateService: CoverStateService,
    private router: Router
  ) { }

  ngOnInit() {
    const cover: FrontCover = this.coverStateService.getCoverInfo();
    cover.filePath = this.coverStateService.getCoverImage().url;
    this.coverForm = this.formBuilder.group({
      position: [cover.position, Validators.required],
      title: [cover.title || '', Validators.required],
      subtitle: [cover.subtitle || '', Validators.required],
      filePath: [cover.filePath || '', Validators.required]
    });
  }

  selectPhoto() {
    const dialogRef = this.dialog.open(CoverPhotoSelectModalComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().pipe(filter(x => x)).subscribe(() => {
    });
  }

  onSave() {
    const image = this.coverStateService.getCoverImage();
    this.coverStateService.saveCoverInfo(image, this.coverForm.value);
  }

  nextStep() {

  }

  prevStep() {

  }

}
