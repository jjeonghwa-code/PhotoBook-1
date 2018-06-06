import { Component, OnInit, ViewChild, ViewEncapsulation, Input, OnChanges, Output, EventEmitter, ElementRef } from '@angular/core';
// Import PhotoEditor SDK React
import * as PhotoEditorReactUI from 'photoeditorsdk/js/PhotoEditorSDK.UI.ReactUI.js';

const license = '{"owner":"Paul Healy","version":"2.1","enterprise_license":false,"available_actions":["magic","filter","transform","sticker","text","adjustments","brush","focus","frames","camera"],"features":["adjustment","filter","focus","overlay","transform","text","sticker","frame","brush","camera","textdesign","library","export"],"platform":"HTML5","app_identifiers":[],"api_token":"dlJZl2_4pAUwOLEYSHCd2g","domains":["https://api.photoeditorsdk.com"],"issued_at":1528102074,"expires_at":1530576000,"signature":"DP3hkVhX8y4kKdUF+Opul43ka4z50rZUtHiD85x092ydUtZU/QPmnA6IP7OAi3YQUgJeapCnCidC99VwYdlOAhhG89HXtTlvai8w1yzqXLYlGK2Syl8vrLiqOWkAjhmwYFgOcCqCHhpNqYPI9sc5fdCHBg9jMk/dYvIh2Pdal6wSRW+qpsZaEIgX726ZZxq3S2yIPYhYkgnVq+wEQzZCnnE7tm6v6KcHmJ0lZ32nFOe6XB8s6rpeQbk+/2AXfEn8x8E+7BnyobhiQEUQXwX0u6PEphiyFPcA5oFk+10Mu1NxxVEr91LAa/p7SzvBl+HKKIQIWLVW0gW8qlzZEUeLvxZAHt2wVYpS18zxpjYQQCYKBOflaBEKReiwoCY8PyXl2IinibLbRCXM1xCYz9n7w2CCw7d1OqwRzkVnD/zm8i3388vRM7MlC/TEFsyTbNTP9ZJ2ShkcMBPRm78BfyMcwNx1G3rcEYgOpoeg/N/z8FzLn6hg4JjkIZpezea9bv/m+R+kDo1+NLCMvts4PRfoCbeOiUvXj8jHrg2GTC0fNRPERZOotU/aoEI5is0phsp2lw4whZM7K0vTkWcRrn7MO+kk1uoWYL2i9+CgYP1mJeRVLZ6vS7338iDnUUzBzul/zmPGBWYxmwOms+nV2lH2/SnDq1kG6KXkQn+Usb+V92M="}'

// the PhotoEditorSDK expects React and ReactDom to be available in global/window
import * as React from 'react';
import * as ReactDom from 'react-dom'

declare global {
  interface Window { React: any; ReactDom: any; }
}

window.React = window.React || React
window.ReactDom = window.ReactDom || ReactDom

@Component({
  selector: 'app-pesdk-reactui',
  templateUrl: './pesdk-reactui.component.html',
  styleUrls: ['../../../../../../node_modules/photoeditorsdk/css/PhotoEditorSDK.UI.ReactUI.css'],
  encapsulation: ViewEncapsulation.None
})
export class PesdkReactuiComponent implements OnInit, OnChanges {
  //members
  reactComponent: React.Component
  reactProps: any
  //inputs
  @Input() license: string = license;
  @Input() imgSrc: string;
  @Output() srcChange: EventEmitter<any> = new EventEmitter();
  image = new Image();
  editor;

  //functions
  constructor(private el: ElementRef) {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    let licenseProps = {
      license: this.license
    }

    this.image.src = this.imgSrc;
    console.log(123, this.el);
    this.editor = new PhotoEditorReactUI({
      container: this.el.nativeElement,
      license: license,
      assets: {
        baseUrl: '/assets/photoeditorsdk' // see angular-cli.json for configuraton
      },
      responsive: true,
      style: {
        width: 1024,
        height: 576
      },
      editor: {
        image: this.image,
        export: {
          download: false
        }
      },
    });
    this.editor.on('export', (result) => this.srcChange.emit(result));

    // let defaultProps = {
    //   license: license,
    //   assets: {
    //     baseUrl: '/assets/photoeditorsdk' // see angular-cli.json for configuraton
    //   },
    //   style:{
    //     width: 1024,
    //     height: 576
    //   },
    //   editor: {
    //     image: image
    //   }
    // }

    // this.reactComponent = PhotoEditorReactUI.ReactComponent; // use the react Component
    // this.reactProps = {...defaultProps, ...licenseProps}
  }
}
