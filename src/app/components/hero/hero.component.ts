import {
  Component,
  inject,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';

import { ThemeService } from '../../../theme/theme.service';

import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule, MatGridListModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  translate: TranslateService = inject(TranslateService);

  constructor(
    public themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.hero', { duration: 1.5, opacity: 0, scale: 0.9 });
    }
  }
}
