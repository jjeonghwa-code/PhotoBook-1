import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from '@photobook/state-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { UploadStateService } from '../../services/upload-state.service';
import { FileService } from '@photobook/core/services/file.service';

@Component({
  selector: 'pb-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit, OnDestroy {

  isLoading = false;
  magazine$$: Subscription = new Subscription();

  constructor(
    private stateService: StateService,
    private uploadStateService: UploadStateService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.magazine$$ = this.stateService.magazine$.subscribe(magazine => {
      console.log(magazine);
    });
  }

  ngOnDestroy() {
    this.magazine$$.unsubscribe();
  }

  async addFile(e: any) {
    console.log(e);
    try {
      this.isLoading = true;
      const _target: any = event.target;
      await this.uploadStateService.saveNewFiles(_target.files);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }
}
