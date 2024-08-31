import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'isDarkTheme';
  private isDarkTheme: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isDarkTheme = this.loadTheme();
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    this.saveTheme();
  }

  isDarkMode(): boolean {
    return this.isDarkTheme;
  }

  private applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-theme', this.isDarkTheme);
      document.body.classList.toggle('light-theme', !this.isDarkTheme);
    }
  }

  private saveTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.themeKey, String(this.isDarkTheme));
    }
  }

  private loadTheme(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.themeKey);
      return savedTheme === null ? true : savedTheme === 'true';
    }
    return true;
  }
}
