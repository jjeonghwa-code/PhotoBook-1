import { PhotoTemplate } from '@photobook/core/models/photo-template';
import { PhotoItem } from '@photobook/core/models/photo-item';

export class PageTemplate {
  allTemplatePages = [];
  multiTemplatePages = [];
  singleTemplatePages = [];
  isSpread;

  templateLandscapeSingle;
  templateLandscapeDual;
  templatePortraitFill;

  photoTemplates: any = {
    landscapePhotoTemplates: [],
    portraitPhotoTemplates: [],
    allPhotoTemplates: []
  };

  constructor() {}

  initWithJSON(json) {
    this.photoTemplates.index = json.ID;
    this.photoTemplates.photos = json.photos;
    this.photoTemplates.isSpread = false;

    for (let i = 0; i < this.photoTemplates.photos.length; i++) {
      const photoTemplate = new PhotoTemplate();
      photoTemplate.initWithJSON(this.photoTemplates.photos[i]);
      if (photoTemplate.isLandscape()) {
        this.photoTemplates.landscapePhotoTemplates.push(photoTemplate);
      } else {
        this.photoTemplates.portraitPhotoTemplates.push(photoTemplate);
      }
      this.photoTemplates.allPhotoTemplates.push(photoTemplate);
    }

    return this;
  }

  initAsSpread(photo, photoIndex, spreadPageNumber) {
    this.isSpread = true;

    const photoTemplate = new PhotoTemplate();
    photoTemplate.initAsSpread(photoIndex, spreadPageNumber);
    photoTemplate.extendWithPhoto(photo);

    this.photoTemplates.push(photoTemplate);

    this.photoTemplates.landscapePhotoTemplates.push(photoTemplate);
    this.photoTemplates.allPhotoTemplates.push(photoTemplate);

    return this;
  }

  getRandomMultiPageTemplate() {
    const max = this.multiTemplatePages.length;
    const index = Math.floor((Math.random() * max));
    return this.multiTemplatePages[index];
  }

  getRandomSinglePageTemplate() {
    const max = this.singleTemplatePages.length;
    const index = Math.floor((Math.random() * max));
    return this.singleTemplatePages[index];
  }

  getRandomPageTemplate() {
    const max = this.allTemplatePages.length;
    const index = Math.floor((Math.random() * max));
    return this.allTemplatePages[index];
  }

  fillWithPhotos(selectedPhotos) {
    let numberOfLandscapePhotos = 0;
    let numberOfPortraitPhotos = 0;

    for (let i = 0; i < selectedPhotos.length; i++) {
      const currentPhoto = selectedPhotos[i];
      if (currentPhoto.isLandscape()) {
        if (this.photoTemplates.landscapePhotoTemplates.length > numberOfLandscapePhotos) {
          const photoTemplate = this.photoTemplates.landscapePhotoTemplates[numberOfLandscapePhotos];
          photoTemplate.extendWithPhoto(currentPhoto);
          numberOfLandscapePhotos++;
        } else {
          return false;
        }
      } else {
        if (this.photoTemplates.portraitPhotoTemplates.length > numberOfPortraitPhotos) {
          const photoTemplate = this.photoTemplates.portraitPhotoTemplates[numberOfPortraitPhotos];
          photoTemplate.extendWithPhoto(currentPhoto);
          numberOfPortraitPhotos++;
        } else {
          return false;
        }
      }
    }

    if ((this.photoTemplates.portraitPhotoTemplates.length === numberOfPortraitPhotos) &&
      (this.photoTemplates.landscapePhotoTemplates.length === numberOfLandscapePhotos)) {
      return true;
    } else {
      return false;
    }
  }

  // getTemplates(url) {
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

  loadPageTemplates(data) {
    const templateJSONList = data;
    for (let i = 0; i < templateJSONList.templates.length; i++) {

      const tmpPageTemplate = templateJSONList.templates[i];

      switch (tmpPageTemplate.ID) {
        case 15:
          this.templateLandscapeDual = tmpPageTemplate;
          break;
        case 25:
          this.templateLandscapeSingle = tmpPageTemplate;
          break;
        case 18:
          this.templatePortraitFill = tmpPageTemplate;
          break;
        default:
          break;
      }

      if (tmpPageTemplate.photos.length > 1) {
        this.multiTemplatePages.push(tmpPageTemplate);
      } else {
        this.singleTemplatePages.push(tmpPageTemplate);
      }

      this.allTemplatePages.push(tmpPageTemplate);
    }
  }

  loadPhotoTemplates() {
    for (let i = 0; i < this.allTemplatePages.length; i++) {
      for (let j = 0; j < this.allTemplatePages[i].photos.length; j++) {
        const photoTemplate = new PhotoItem(this.allTemplatePages[i].photos[j]);
        if (photoTemplate.isLandscape()) {
          this.photoTemplates.landscapePhotoTemplates.push(photoTemplate);
        } else {
          this.photoTemplates.portraitPhotoTemplates.push(photoTemplate);
        }
        this.photoTemplates.allPhotoTemplates.push(photoTemplate);
      }
    }
  }

  getTemplateLandscapeSingle() {
    return this.templateLandscapeSingle;
  }

  getTemplatePortraitFill() {
    return this.templatePortraitFill;
  }

  getTemplateLandscapeDual() {
    return this.templateLandscapeDual;
  }
}
