export class StorageFileInfo {
  url: any;
  name: string;
  orientation: number;
  isCover: boolean;
  id: string;
  height: number;
  width: number;
  text: string;
  weight: string;
  isLoading: boolean;
  isFailed: boolean;

  constructor(
    url = '',
    name = '',
    orientation = 0,
    isCover = false,
    id = '',
    height = 0,
    width = 0,
    text = '',
    weight = '',
    isLoading = false) {
    this.url = url;
    this.name = name;
    this.orientation = orientation;
    this.isCover = isCover;
    this.id = id;
    this.height = height;
    this.width = width;
    this.text = text;
    this.weight = weight;
    this.isLoading = isLoading;
  }

  buildFileInfoFromImage(image, index) {
    this.url = image.imgUrl;
    this.name = image.imgName;
    this.orientation = +image.imgWidth > +image.imgHeight ? 0 : 1;
    this.isCover = image.isCover;
    this.id = image.imgID;
    this.height = +image.imgHeight;
    this.width = +image.imgWidth;
    this.text = image.text;
    this.weight = index;
    this.isLoading = false;
  }
}
