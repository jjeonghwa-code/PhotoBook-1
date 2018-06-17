import { Injectable } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { template, templateSettings } from 'lodash';
import { API } from '@photobook/core/consts/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  @Language() lang: string;

  constructor(
    private translationService: TranslationService
  ) { }

  public imgUrlToBase64Data(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  public trackStringItem(index: any, item: string): string {
    return item ? item : index;
  }

  public numberWithCommas(num: number): string {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Translation Services
  public translateTemplate(localizationKey: string, replacementObject: any = null): string {
    const translatedText = this.replaceTranslationTemplate(
      this.translationService.translate(localizationKey),
      replacementObject
    );

    return translatedText;
  }

  public replaceTranslationTemplate(translatedText: string, replacementObject: any): string {
    templateSettings.interpolate = /%{([\s\S]+?)}/g;
    const compiled = template(translatedText);
    return compiled(replacementObject);
  }

  checkImageUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (!pattern.test(url)) {
      console.log(url);
      return url;
    } else {
      const imageScaleUrl = API.url.imageScaleUrl;
      return imageScaleUrl + '?width=300&height=300&image=' + url;
    }
  }
}
