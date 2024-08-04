import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { MarkdownModule } from 'ngx-markdown';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MarkdownModule, SidebarModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.addLangs(['en', 'zh-tw']);
    this.translateService.setDefaultLang('zh-tw');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang?.match(/en|zh-tw/) ? browserLang : 'zh-tw');
  }
}
