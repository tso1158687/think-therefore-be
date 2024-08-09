import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { MarkdownModule } from 'ngx-markdown';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Lang } from './enum/lang.enum';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MarkdownModule,
    SidebarModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(Lang.EN);
    this.translateService.addLangs([Lang.EN, Lang.ZH]);
    const browserLang = this.translateService.getBrowserLang() || Lang.EN;
    this.translateService.use(
      browserLang?.match(/en|zh/) ? browserLang : Lang.EN
    );
  }
}
