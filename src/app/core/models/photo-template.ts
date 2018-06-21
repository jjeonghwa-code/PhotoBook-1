export class PhotoTemplate {
  isSpread;
  isCover;
  text;
  filePath;
  name;
  id;
  x;
  y;
  width;
  height;
  photoID;
  orientation;

  constructor() {}

  initWithJSON(json) {
    this.isSpread = 0;
    this.x = json.x;
    this.y = json.y;
    this.width = json.width;
    this.height = json.height;
    this.orientation = json.orientation;

    return this;
  }

  extendWithPhoto(photo) {
    this.isCover = photo.isCover;
    this.text = photo.text;
    this.id = photo.id;
    this.filePath = photo.filePath;
    this.name = photo.name;
    this.photoID = (photo.name).replace(/\.[^/.]+$/, '');
  }

  isLandscape() {
    return this.orientation === 0;
  }

  initAsSpread(photoIndex, spreadPageNumber) {
    this.isSpread = spreadPageNumber;

    this.x = -10;
    this.y = -5;
    this.width = 230;

    this.orientation = 0;

    return this;
  }
}
