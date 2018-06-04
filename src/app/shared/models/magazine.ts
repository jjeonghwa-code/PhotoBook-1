import { Photo } from './photo';

export interface Magazine {
  border_thickness: number;
  cover_subtitle: string;
  cover_title: string;
  cover_title_position: number;
  frame: number;
  page_color: string;
  pattern: number;
  selected_cover: string;
  files: Photo[];
}
