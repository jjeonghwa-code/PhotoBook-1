import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from './services/layout-state.service';
import { MagazineProd } from '@photobook/core/models/magazine-prod';

@Component({
  selector: 'pb-layout-step',
  templateUrl: './layout-step.component.html',
  styleUrls: ['./layout-step.component.scss']
})
export class LayoutStepComponent implements OnInit {

  book: MagazineProd = new MagazineProd();
  itemArray = [];
  selectedOption = 0;

  constructor(
    public layoutStateService: LayoutStateService
  ) { }

  ngOnInit() {
    this.book.createMagazine(this.layoutStateService.magazine.files);
    this.itemArray = this.range(this.book.magazineJSONS[this.selectedOption].pages.length);
    console.log(this.itemArray);
  }

  range(length) {
    const input = [];
    length = Math.round(length);
    for (let i = 0; i < length; i += 2) {
      input.push(i);
    }
    return input;
  }

}
