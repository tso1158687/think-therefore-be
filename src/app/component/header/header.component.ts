import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Lang } from '../../enum/lang.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterModule,
    MenuModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private translateService = inject(TranslateService);
  items: MenuItem[] = [
    {
      label: 'English',
      command: () => this.selectLanguage(Lang.EN),
    },
    {
      label: '繁體中文',
      command: () => this.selectLanguage(Lang.ZH),
    },
  ];

  selectLanguage(lang: string): void {
    this.translateService.use(lang);
  }
}
