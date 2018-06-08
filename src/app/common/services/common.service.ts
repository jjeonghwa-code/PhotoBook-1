import { Injectable } from '@angular/core';
import { Language, TranslationService } from 'angular-l10n';
import { template, templateSettings } from 'lodash';

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
}
