import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ThemeService } from '../../../theme/theme.service';

import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslateModule, MatGridListModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  translate: TranslateService = inject(TranslateService);

  constructor(public themeService: ThemeService) {}
}
