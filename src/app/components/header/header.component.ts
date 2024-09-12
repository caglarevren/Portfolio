import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ThemeService } from '../../../theme/theme.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSelectorComponent,
    TranslateModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() isDarkMode: boolean = false;
  @Input() sidenav!: MatSidenav;
  @Output() darkModeChange = new EventEmitter<boolean>();

  translate: TranslateService = inject(TranslateService);
  isSidebarOpened: boolean = false;

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    this.darkModeChange.emit(this.isDarkMode);
  }
}
