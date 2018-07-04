import { Component, OnInit } from '@angular/core';
import { StyleStateService } from './services/style-state.service';
import { StorageFileInfo } from '@photobook/core/models/storage-file-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MagazineStyle } from '@photobook/core/models/magazine';
import { CommonService } from '@photobook/common-service';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private router: Router
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

  nextStep() {
    this.styleStateService.setMagazineStyle(this.styleForm.value);
    this.router.navigate(['/magazine/create/step4']);
  }

  prevStep() {
    this.styleStateService.setMagazineStyle(this.styleForm.value);
    this.router.navigate(['/magazine/create/step2']);
  }

}
