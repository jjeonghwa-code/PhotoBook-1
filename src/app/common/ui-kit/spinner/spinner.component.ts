import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pb-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() diameter = 30;
  @Input() stroke = 3;

  constructor() { }

  ngOnInit() {
  }

}
