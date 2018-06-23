import { Injectable } from '@angular/core';
import { StateService } from '@photobook/state-service';
import { Magazine, MagazineStyle } from '@photobook/core/models/magazine';
import { CoverPosition } from '../../cover-step/components/cover-position-selector/cover-position-selector.component';
import { BorderType } from '../components/border-selector/border-selector.component';
import { PatternType } from '../components/pattern-selector/pattern-selector.component';

@Injectable({
  providedIn: 'root'
})
export class StyleStateService {

  constructor(
    private stateService: StateService
  ) { }

  getFirstPhoto() {
    const magazine: Magazine = this.stateService.getMagazine();
    return magazine.files[0];
  }

  getMagazineStyle() {
    const magazine: Magazine = this.stateService.getMagazine();
    return magazine.magazineStyle ||
      {border: BorderType.Border_0, borderThickness: 0, pattern: PatternType.Pattern_0, backgroundColor: '#FFFFFF'};
  }

  setMagazineStyle(style: MagazineStyle) {
    this.stateService.setMagazinePart('magazineStyle', style);
    this.stateService.sendStorageToBackend();
  }
}
