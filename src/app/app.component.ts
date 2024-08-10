import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { MarkdownModule } from 'ngx-markdown';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Lang } from './enum/lang.enum';
import { Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';
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
  providers: [TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private translateService = inject(TranslateService);
  constructor(private title: Title,private translatePipe: TranslatePipe) {
    this.translateService.setDefaultLang(Lang.EN);
    this.translateService.addLangs([Lang.EN, Lang.ZH]);
    const browserLang = this.translateService.getBrowserLang() || Lang.EN;
    this.translateService.use(
      browserLang?.match(/en|zh/) ? browserLang : Lang.EN
    )
    .pipe(
      finalize(() => {
        this.setPageTitle();
      })
    )
    .subscribe();
  }

  setPageTitle(): void {
    const pageTitle = this.translatePipe.transform('page_title');
    this.title.setTitle(pageTitle);
  }
}
