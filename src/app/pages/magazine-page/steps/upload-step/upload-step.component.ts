import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { UploadStateService } from './services/upload-state.service';
import { StateService } from '@photobook/state-service';
import { PhotoEditModalComponent } from './components/photo-edit-modal/photo-edit-modal.component';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DragulaService } from 'ng2-dragula';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '@photobook/common-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pb-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.scss']
})
export class UploadStepComponent implements OnInit, OnDestroy {

  isLoading = false;
  magazine$ = this.stateService.magazine$;

  // magazineSubscription: Subscription = new Subscription();
  // files;

  dragAreaClass = 'dragarea';

  constructor(
    public dialog: MatDialog,
    public uploadStateService: UploadStateService,
    private stateService: StateService,
    private sanitizer: DomSanitizer,
    private dragulaService: DragulaService,
    private commonService: CommonService
  ) {
    // dragulaService.setOptions('draggable-photo-bag', {
    //   revertOnSpill: true,
    //   moves: function (el: any, container: any, handle: any): any {
    //     return handle.classList.contains('image-wrapper');
    //   },
    // });
    dragulaService.drop.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

    // this.magazineSubscription = this.magazine$.subscribe((magazine) => {
    //   this.files = magazine.files;
    // });
  }

  ngOnDestroy() {
    // this.magazineSubscription.unsubscribe();
  }

  onDropModel(args) {
    let [el, target, source] = args;
    // console.log(11111, this.files);
    // do something else
  }

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

  photoUrl(url) {
    return this.commonService.checkImageUrl(url);
  }

  async addFiles(e: any) {
    try {
      const _target: any = event.target;
      await this.uploadStateService.saveNewFiles(_target.files);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  deleteFile(file, event) {
    event.stopPropagation();
    this.uploadStateService.openDeleteConfirmModal(file);
  }

  deleteAll() {
    this.uploadStateService.openDeleteAllConfirmModal();
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

  nextStep() {

  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.uploadStateService.saveNewFiles(files);
  }
}
