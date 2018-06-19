import { StorageFileInfo } from '@photobook/core/models/storage-file-info';

export interface FrontCover {
  title: string;
  subtitle: string;
  position: number;
}

export interface Magazine {
  files?: StorageFileInfo[];
  frontCover?: FrontCover;
  selectedCover?: string;
}
