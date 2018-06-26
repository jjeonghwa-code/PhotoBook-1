import { Component, OnInit } from '@angular/core';
import { StateService } from '@photobook/state-service';

declare var createMagazineWithJSON: any;
declare var $: any;

@Component({
  selector: 'pb-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.scss']
})
export class PreviewStepComponent implements OnInit {

  generatedMagazinesBlobUrl: any = {};
  generatedPagesProgress: any = 0;

  pdfUrl = '';
  isNavigation = true;

  wowbookParams = {
    width: 600,
    height: 500,
    scaleToFit: '#pdf-container',
    pdf: '',
    turnPageDuration: 600,
    flipSound: false,
    pageNumbers: false,
    centeredWhenClosed: true,
    controls : {
      next : '.book-left-arrow',
      back : '.book-right-arrow',
    },
    onShowPage: this.onShowPage,
  };

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.generatePDF();
  }

  generatePDF() {
    this.displayMagazine({generated: false});
  }

  displayWowbook() {
    this.wowbookParams.pdf = this.pdfUrl;
    $('#wowbook-container').wowBook(this.wowbookParams);
  }

  displayMagazine(options) {
    options = options || {};
    // vm.disableGeneratorActions(); // disable background

    // Loop through all the magazine and update the variables.
    // In this case the text at the photos.
    for (let i = 0; i < this.stateService.magazineJSON.length; i++) {
      for (let n in this.stateService.magazineJSON[i].pages) {
        for (let m in this.stateService.magazineJSON[i].pages[n]) {
          const f = this.stateService.getFileById(this.stateService.magazineJSON[i].pages[n][m].id);
          this.stateService.magazineJSON[i].pages[n][m].text = f.text;
        }
      }
    }

    if (this.generatedMagazinesBlobUrl[this.stateService.currentMagazine.magazineID] && options.generate === false) {
      const blobURL = this.generatedMagazinesBlobUrl[this.stateService.currentMagazine.magazineID];
      // storageService.set('currentMagazine', vm.currentMagazine);
      // magazineService.isDisplayed = true;

      // vm.wowbookParams.pdf = blobURL;
      // $('#wowbook-container').wowBook(vm.wowbookParams);
      //
      // vm.enableGeneratorActions();
      // return;
    }

    const updateUploadProgress = (progress) => {
      this.generatedPagesProgress = progress;
    };
    const promise = new Promise((resolve, reject) => {
      createMagazineWithJSON(JSON.stringify(this.stateService.currentMagazine), resolve, reject, updateUploadProgress);
      // storageService.set('currentMagazine', vm.currentMagazine);
      // magazineService.isDisplayed = true;
    }).then((data: any) => {
      const blobURL = data.url;
      const blobObject = data.object;
      this.generatedMagazinesBlobUrl[this.stateService.currentMagazine.magazineID] = blobURL;
      this.pdfUrl = blobURL;
      this.isNavigation = false;
      this.displayWowbook();
        // vm.enableGeneratorActions();
      })
      .catch((err) => {
        console.log(err);
        console.log('Generation of the magazine from JSON failed');
      });
  }

  onShowPage(book, page, pageIndex) {
    if (!book) return;
    const wowbookContainer = $('#wowbook-container');
    pageIndex = (pageIndex === -1) ? 1 : pageIndex + 1;

    // insert the 3 divs if they arent' there.
    if ($('.page-number.left', wowbookContainer).length < 1) {
      const template = '<div class="page-number left"></div>';
      wowbookContainer.prepend(template)
    }
    if ($('.page-number.right', wowbookContainer).length < 1) {
      const template = '<div class="page-number right"></div>';
      wowbookContainer.prepend(template)
    }
    if ($('.page-number.centered', wowbookContainer).length < 1) {
      const template = '<div class="page-number centered"></div>';
      wowbookContainer.prepend(template)
    }

    // if we are looking at the front/back cover, unset left + right page num
    // and show the centered one.
    if (pageIndex < 2 || pageIndex > (book.pages.length - 1)) {
      $('.page-number.left, .page-number.right', wowbookContainer).html('');
      $('.page-number.centered', wowbookContainer).html(pageIndex);
    } else {
      $('.page-number.centered', wowbookContainer).html('');

      if (page.onLeft === true) {
        $('.page-number.left', wowbookContainer).html(pageIndex);
      } else if (page.onRight === true) {
        $('.page-number.right', wowbookContainer).html(pageIndex);
      }
    }

  } // onShowPage

  prevStep() {

  }

  nextStep() {
    
  }

}
