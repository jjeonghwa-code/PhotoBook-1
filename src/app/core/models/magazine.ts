import { StorageFileInfo } from '@photobook/core/models/storage-file-info';

export interface MagazineStyle {
  backgroundColor: string;
  border: number;
  borderThickness: number;
  pattern: number;
}

export interface FrontCover {
  title: string;
  subtitle: string;
  position: number;
  filePath: string;
}

export interface Magazine {
  files?: StorageFileInfo[];
  frontCover?: FrontCover;
  magazineStyle?: MagazineStyle;
  selectedCover?: string;
}
