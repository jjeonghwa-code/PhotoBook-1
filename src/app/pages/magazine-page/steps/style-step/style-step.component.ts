import { Component, OnInit } from '@angular/core';
import { StyleStateService } from './services/style-state.service';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MagazineStyle } from '@photobook/core/models/magazine';
import { CommonService } from '@photobook/common-service';

@Component({
  selector: 'pb-style-step',
  templateUrl: './style-step.component.html',
  styleUrls: ['./style-step.component.scss']
})
export class StyleStepComponent implements OnInit {

  image: StorageFileInfo = new StorageFileInfo();
  styleForm: FormGroup;

  constructor(
    public styleStateService: StyleStateService,
    public commonService: CommonService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.image = this.styleStateService.getFirstPhoto();
    const magazineStyle: MagazineStyle = this.styleStateService.getMagazineStyle();

    this.styleForm = this.formBuilder.group({
      backgroundColor: [magazineStyle.backgroundColor, Validators.required],
      border: [magazineStyle.border, Validators.required],
      borderThickness: [magazineStyle.borderThickness, Validators.required],
      pattern: [magazineStyle.pattern, Validators.required],
    });
  }

  test() {
    this.styleStateService.setMagazineStyle(this.styleForm.value);
  }

  nextStep() {

  }

  prevStep() {
    
  }

}
