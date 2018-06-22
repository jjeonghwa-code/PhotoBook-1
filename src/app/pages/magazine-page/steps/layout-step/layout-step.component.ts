import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutStateService } from './services/layout-state.service';
import { MagazineProd } from '@photobook/core/models/magazine-prod';
import { StateService } from '@photobook/state-service';
import { Magazine } from '@photobook/core/models/magazine';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'pb-layout-step',
  templateUrl: './layout-step.component.html',
  styleUrls: ['./layout-step.component.scss']
})
export class LayoutStepComponent implements OnInit, OnDestroy {

  book: MagazineProd = new MagazineProd();
  itemArray = [];
  selectedLayoutOption = 0;

  currentMagazine: any;
  backCover: any;
  frontCover: any;

  generatedMagazinesBlobUrl: any = {};

  even1$: Subscription = new Subscription();

  constructor(
    public layoutStateService: LayoutStateService,
    public stateService: StateService
  ) { }

  ngOnInit() {
    this.frontCover = this.layoutStateService.cover;
    this.generateJSON();
    this.even1$ = this.layoutStateService.setCurrentMagazine.subscribe(index => {
      this.setCurrentMagazine(index);
    });
  }

  ngOnDestroy() {
    this.even1$.unsubscribe();
  }

  generateJSON(options?: any) {
    options = options || {};
    this.generatedMagazinesBlobUrl = {};
    if (this.stateService.isGenerated === false || options.force === true) {
      const magazine: Magazine = this.stateService.getMagazine();
      this.book.createMagazine(magazine.files);
      this.stateService.isGenerated = true;
      this.setMagazine(this.book.magazineJSONS);
      // profileService.magazine_preview_agree = false;
    } else {
      this.setMagazine(this.stateService.magazineJSON);
    }
  }

  setMagazine(magazineJSON) {
    const magazine: Magazine = this.stateService.getMagazine();

    for (let i = 0; i < magazineJSON.length; i++) {
      magazineJSON[i].frame = magazine.magazineStyle.border;
      magazineJSON[i].frameDecorationThickness = magazine.magazineStyle.borderThickness;
      if (magazine.magazineStyle.border === 3) {
        magazineJSON[i].frameDecorationThickness = 3.6;
      } else if (magazine.magazineStyle.border === 4) {
        magazineJSON[i].frameDecorationThickness = 1.0;
      }
      if (!magazineJSON[i].frontCover) {
        magazineJSON[i].frontCover = {};
      }
      magazineJSON[i].frameThickness = magazine.magazineStyle.borderThickness;
      magazineJSON[i].pattern = magazine.magazineStyle.pattern;
      magazineJSON[i].pageColor = magazine.magazineStyle.backgroundColor;
      magazineJSON[i].frontCover.title = magazine.frontCover.title;
      magazineJSON[i].frontCover.subtitle = magazine.frontCover.subtitle;
      magazineJSON[i].frontCover.titlePosition = magazine.frontCover.position;
      magazineJSON[i].frontCover = magazineJSON[i].frontCover;
      magazineJSON[i].magazineID = i;
      let count = 0;
      for (const n in magazineJSON[i].pages) {
        for (const m in magazineJSON[i].pages[n]) {
          const f = this.stateService.getFileById(magazineJSON[i].pages[n][m].id);
          magazineJSON[i].pages[n][m].text = f.text;
          count++;
        }
      }
      magazineJSON[i].numberOfPhotos = count; // Amount of photos used on all pages, plus 1 for the cover.
    }

    this.stateService.magazineJSON = magazineJSON;
    this.setCurrentMagazine(this.stateService.selectedLayoutOption);
    this.selectedLayoutOption = this.stateService.selectedLayoutOption;
  }

  setCurrentMagazine(index) {
    // loading spinner
    this.stateService.selectedLayoutOption = index;
    this.selectedLayoutOption = this.stateService.selectedLayoutOption;
    this.currentMagazine = this.stateService.magazineJSON[this.stateService.selectedLayoutOption];
    this.stateService.saveCurrentMagazine(this.currentMagazine);
    this.backCover = this.currentMagazine.pages[this.currentMagazine.pages.length - 1];
    this.itemArray = this.range(this.currentMagazine.pages.length - 3);
    this.stateService.saveCurrentMagazine(this.currentMagazine);
    // vm.enableGeneratorActions();
  }

  disableGeneratorActions() {
    // loading spinner
  }

  range(length) {
    const input = [];
    length = Math.round(length);
    for (let i = 0; i < length; i += 2) {
      input.push(i);
    }
    return input;
  }

  setPreviewImageWidth(total, current, isSpread) {
    let width;
    switch (isSpread) {
      case 1:
        width = '200%';
        break;
      case 2:
        width = '0%';
        break;
      default:
        width = this.toPercentage(total, current, isSpread);
    }
    return width;
  }

  setPreviewImageHeight(total, current, isSpread) {
    let height;
    switch (isSpread) {
      case 1:
        height = '100%';
        break;
      case 2:
        height = '0%';
        break;
      default:
        height = this.toPercentage(total, current, isSpread);
    }
    return height;
  }

  toPercentage(total, current, isSpread) {
    let percentage = 100 / total * current;
    if (percentage > 100) {
      percentage = 100;
    } else if (percentage < 0) {
      percentage = 0;
    }
    return percentage + '%';
  }

  prevStep() {

  }

  nextStep() {
    
  }

}
