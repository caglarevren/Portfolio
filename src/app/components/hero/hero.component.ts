import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
}
