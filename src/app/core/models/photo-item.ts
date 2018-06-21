export class PhotoItem {
  isCover;
  name;
  text;
  filePath;
  shouldCropToPortrait;
  orientation;
  photoID;
  id;
  height;
  width;

  constructor(data) {
    this.isCover = data.isCover;
    this.name = data.name;
    this.text = data.text ? data.text : '';
    this.filePath = data.url;
    this.shouldCropToPortrait = false;
    this.orientation = data.orientation;
    this.id = data.id;
    this.photoID = data.name ? (data.name).replace(/\.[^/.]+$/, "") : "";

    this.height = data.height;
    this.width = data.width;
  }

  isCover() {
    return this.isCover === true;
  }

  isLandscape() {
    return this.orientation === 1;
  }

  isPortrait() {
    return this.orientation === 0;
  }

}
