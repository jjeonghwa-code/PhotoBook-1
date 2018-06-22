import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[pbDroppable]'
})
export class DroppableDirective {

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('dragenter', ['$event']) onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.element.nativeElement.parent().addClass('s-dragenter');
  }

}
