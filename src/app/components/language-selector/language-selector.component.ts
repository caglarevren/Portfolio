import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [TranslateModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  translate: TranslateService = inject(TranslateService);
  selectedCountry = 'en';
  selectedCountryText = 'English';
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      const locale = localStorage.getItem('locale') ?? 'en';
      this.translate.setDefaultLang(locale);
      this.selectedCountry = locale;

      if (locale === 'tr') {
        this.selectedCountryText = 'Türkçe';
      } else {
        this.selectedCountryText = 'English';
      }

      this.translate.use(locale);
      if (!localStorage.getItem('locale')) {
        localStorage.setItem('locale', 'en');
        this.selectedCountry = 'en';
        this.selectedCountryText = 'English';
      }
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      this.selectedCountry = 'en';
      this.selectedCountryText = 'English';
    }
  }

  getFlag(country: string): string {
    if (this.isBrowser) {
      const storedCountry = localStorage.getItem('locale') ?? 'en';
      const countryCode = storedCountry || country;

      switch (countryCode) {
        case 'en':
          return 'assets/images/england.png';
        case 'tr':
          return 'assets/images/turkey.png';
        default:
          return '';
      }
    }
    return '';
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    if (this.isBrowser) {
      localStorage.setItem('locale', lang);
      this.selectedCountry = lang;
    }

    if (lang === 'tr') {
      this.selectedCountryText = 'Türkçe';
    } else {
      this.selectedCountryText = 'English';
    }
  }
}
