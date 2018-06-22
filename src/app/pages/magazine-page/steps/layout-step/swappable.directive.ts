import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
import { StateService } from '@photobook/state-service';

declare var $: any;

@Directive({
  selector: '[pbSwappable]'
})
export class SwappableDirective implements AfterViewInit {

  wrapper;

  constructor(
    private stateService: StateService,
    private element: ElementRef
  ) {}

  @HostListener('click', ['$event']) onClick($event) {
    this.swapHandler();
  }

  @HostListener('dragstart', ['$event']) onDragStart($event) {
    this.swapHandler();
  }

  @HostListener('dragend', ['$event']) onDragEnd($event) {
    this.wrapper.removeClass('selected');
    $('.book-image').removeClass('s-disabled');
  }

  @HostListener('dragenter', ['$event']) onDragEnter($event) {
    if ($($event.toElement.hasClass('book-image'))) {
      if ($($event.target).hasClass('s-disabled')) {
        return;
      } else {
        $($event.target).addClass('s-hover');
        this.swapHandler();
      }
    }
  }


  ngAfterViewInit() {
    this.wrapper = $(this.element.nativeElement).parents('.open-book-preview');
  }

  swapHandler() {
    let id, index, pageIndex, orientation, isSpread;
    let targetId, targetIndex, targetPageIndex, targetOrientation, targetIsSpread ;
    let swappedFiles;
    const files = this.stateService.magazineJSON[this.stateService.selectedLayoutOption].pages;
    const target = $('.layout-edit-overlay .selected .book-image.selected');
    this.wrapper.addClass('selected');
    $(this.element.nativeElement).addClass('selected');

    id = +$(this.element.nativeElement).attr('data-id');
    index = +$(this.element.nativeElement).attr('data-index');
    pageIndex = +$(this.element.nativeElement).attr('data-page-index');
    orientation = +$(this.element.nativeElement).attr('data-orientation');
    isSpread = +$(this.element.nativeElement).attr('data-spread');

    $('.book-image:not([data-orientation=' + orientation + '])').addClass('s-disabled');

    targetId = +target.attr('data-id');
    targetIndex = +target.attr('data-index');
    targetPageIndex = +target.attr('data-page-index');
    targetOrientation = +target.attr('data-orientation');
    targetIsSpread = +target.attr('data-spread');

    if (targetOrientation !== orientation) {
      return;
    }

    if (target.length) {
      const attributesToSwap = ['filePath', 'id', 'text', 'name', 'photoID'];

      swappedFiles = this.swap(files, pageIndex, index, targetPageIndex, targetIndex, attributesToSwap, isSpread, targetIsSpread);

      this.stateService.magazineJSON[this.stateService.selectedLayoutOption].pages = swappedFiles;
      // scope.magazine.setCurrentMagazine(this.stateService.selectedLayoutOption);
      target.removeClass('selected');
      this.wrapper.removeClass('selected');
      $('.book-image').removeClass('s-disabled');
      $(this.element.nativeElement).removeClass('selected');
    }
  }

  swap(arr, pageIndex, index, targetPageIndex, targetIndex, attributesToSwap, isSpread, targetIsSpread) {
    for (const i in attributesToSwap) {
      const key = attributesToSwap[i];
      const x = arr[pageIndex][index][key];
      if (isSpread && targetIsSpread) {
        arr[pageIndex][index][key] = arr[targetPageIndex][targetIndex][key];
        arr[targetPageIndex][targetIndex][key] = x;
        const tmp = arr[pageIndex + 1][index][key];
        arr[pageIndex + 1][index][key] = arr[targetPageIndex + 1][targetIndex][key];
        arr[targetPageIndex + 1][targetIndex][key] = tmp;
      } else if (isSpread && !targetIsSpread) {
        const tmp = arr[targetPageIndex][targetIndex][key];
        arr[targetPageIndex][targetIndex][key] = arr[pageIndex][index][key];
        arr[pageIndex][index][key] = tmp;
        arr[pageIndex + 1][index][key] = tmp;
      } else if (!isSpread && targetIsSpread) {
        const tmp = arr[targetPageIndex][targetIndex][key];
        arr[targetPageIndex][targetIndex][key] = arr[pageIndex][index][key];
        arr[targetPageIndex + 1][targetIndex][key] = arr[pageIndex][index][key];
        arr[pageIndex][index][key] = tmp;
      } else {
        arr[pageIndex][index][key] = arr[targetPageIndex][targetIndex][key];
        arr[targetPageIndex][targetIndex][key] = x;
      }
    }
    return arr;
  }

}
