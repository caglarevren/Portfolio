import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  Component,
  inject,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../../theme/theme.service';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    TranslateModule,
    LanguageSelectorComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  isDarkMode: boolean = false;
  isSidebarOpened: boolean = false;
  translate: TranslateService = inject(TranslateService);

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    public themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (this.sidenav) {
          if (result.matches) {
            this.sidenav.close();
          } else {
            this.sidenav.open();
          }
          this.changeDetectorRef.detectChanges();
        } else {
          console.error('Sidenav is not initialized');
        }
      });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }
}
