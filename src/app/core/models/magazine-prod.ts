import { PageTemplate } from '@photobook/core/models/page-template';
import { PhotoItem } from '@photobook/core/models/photo-item';
import { templates } from '@photobook/core/models/templates';

export class MagazineProd {
  allPhotos = [];
  tmpPages = [];

  numberOfSpreads = 0;
  lastSpreadIndex = 0;
  currentMagazine;
  totalRetries;
  shouldBendTheRules;
  workingPhotoList = [];

  pageTemplates;

  frontCover;
  backCoverPhoto;

  magazineJSONS = [];

  constructor() {}

  createMagazine(photos) {
    this.allPhotos = [];
    this.workingPhotoList = [];

    for (let i = 0; i < photos.length; i++) {
      this.allPhotos.push(photos[i]);
      this.workingPhotoList.push(photos[i]);
    }

    for (let i = 0; i < this.workingPhotoList.length; i++) {
      const photo = new PhotoItem(this.workingPhotoList[i]);
      if (photo.isCover) {
        this.frontCover = photo;
        this.workingPhotoList.splice(i, 1);
        break;
      }
    }

    const pageTemplate = new PageTemplate();
    pageTemplate.loadPageTemplates(templates);

    this.pageTemplates = pageTemplate;

    /*console.log('this.workingPhotoList', this.workingPhotoList);*/
    for (let ii = (this.workingPhotoList.length - 1); ii >= 0; ii--) {
      const photo = new PhotoItem(this.workingPhotoList[ii]);
      /*console.log('photo', photo, 'isPortrait', photo.isPortrait());*/
      if (photo.isPortrait()) {
        const backCoverTemplate = this.pageTemplates.getTemplatePortraitFill();
        const backCoverTemplateObject = new PageTemplate();
        backCoverTemplateObject.initWithJSON(backCoverTemplate);
        this.backCoverPhoto = backCoverTemplateObject.photoTemplates;
        /*console.log(1, 'this.backCoverPhoto', this.backCoverPhoto);*/
        /*console.log('backCoverTemplateObject', backCoverTemplateObject);*/
        this.backCoverPhoto.allPhotoTemplates[0].extendWithPhoto(photo);
        /*console.log('backCover', photo);*/
        this.workingPhotoList.splice(ii, 1);
        break;
      }
    }

    for (let ii = 0; ii < 3; ii++) {
      this.currentMagazine = ii;
      this.totalRetries = 0;
      this.lastSpreadIndex -= 2;
      this.shouldBendTheRules = false;

      while (!this.createPages()) {}

      const magazineJSON = {
        'pages': [],
        'frame': 0,
        'pattern': 0,
        'numberOfPhotos': 0,
        'pageColor': '#FFFFFF',
        'frameThickness': 1,
        'frameDecorationThickness': 0,
        'numberOfSpreads': this.numberOfSpreads,
        'frontCover': 0
      };

      for (let j = 0; j < this.tmpPages.length; j++) {
        const currentPage = this.tmpPages[j].photoTemplates;

        magazineJSON.pages.push(currentPage.allPhotoTemplates);
      }

      /*console.log(2, 'this.backCoverPhoto', this.backCoverPhoto)*/
      magazineJSON.pages.push(this.backCoverPhoto.allPhotoTemplates);
      magazineJSON.frontCover = this.frontCover;

      this.magazineJSONS.push(magazineJSON);
    }
    return this.magazineJSONS;
  }


  createPages() {
    this.tmpPages = [];
    const photos = this.allPhotos;
    let pagesToGo = 34;
    let photosToGo = this.workingPhotoList.length;
    let photoIndex = 0;
    this.numberOfSpreads = 0;
    let retries = 0;
    const lastSpreadIndex = 0;
    let shouldBendTheRules = false;

    if (this.totalRetries > 1400 && !this.shouldBendTheRules) {

      this.totalRetries = 0;
      shouldBendTheRules = true;
    }

    while (photoIndex < this.workingPhotoList.length) {
      const pageRatio = photosToGo / pagesToGo;

      while (true) {
        let templateToUse;

        const photo = new PhotoItem(this.workingPhotoList[photoIndex]);

        if ((photosToGo === 1) && (photo.isLandscape())) {
          templateToUse = this.pageTemplates.getTemplateLandscapeSingle();
        } else if (pageRatio > 1.6 && retries < 10) {
          templateToUse = this.pageTemplates.getRandomMultiPageTemplate();
        } else if (pageRatio < 1.3 && retries < 10) {
          templateToUse = this.pageTemplates.getRandomSinglePageTemplate();
        } else if (this.isDualLandscapeAtIndex(photoIndex, photo) && (photoIndex % 3 === 0)) {
          templateToUse = this.pageTemplates.getTemplateLandscapeDual();
        } else {
          templateToUse = this.pageTemplates.getRandomPageTemplate();
          retries = 0;
        }

        const tmpPhotos = [];
        let notEnoughPhotos = false;

        for (let j = 0; j < templateToUse.photos.length; j++) {
          if (photoIndex + j < this.workingPhotoList.length) {
            const newPhoto = new PhotoItem(this.workingPhotoList[photoIndex + j]);
            tmpPhotos.push(newPhoto);
          } else {
            notEnoughPhotos = true;
            break;
          }
        }

        if (notEnoughPhotos) {
          retries++;
          break;
        }

        const templateObject = new PageTemplate();
        templateObject.initWithJSON(templateToUse);

        if (templateObject.fillWithPhotos(tmpPhotos)) {
          photoIndex += templateObject.photoTemplates.allPhotoTemplates.length;

          this.tmpPages.push(templateObject);
          photosToGo = this.workingPhotoList.length - photoIndex;
          pagesToGo --;

          if ((pagesToGo <= 0 && photosToGo > 0) || (photosToGo <= 0 && pagesToGo > 0)) {
            this.totalRetries++;
            return false;
          }
          break;
        } else {
          retries++;
        }
      }
    }
    return true;
  }

  isDualLandscapeAtIndex(index, photo) {
    const itemA = photo;
    if ((index + 1) < this.workingPhotoList.length) {
      const itemB = new PhotoItem(this.workingPhotoList[index + 1]);
      if (itemA.isLandscape() && itemB.isLandscape()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // getPhotos(url) {
  //   return $.ajax({
  //     url: url,
  //     method: 'GET',
  //     dataType: 'json',
  //     success: function () {
  //       console.log('success');
  //     },
  //     error: function () {
  //       console.log('error');
  //     }
  //   });
  // }
}
