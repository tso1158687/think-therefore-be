import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    LottieComponent,
    CardModule,
    TranslateModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  options: AnimationOptions = {
    path: 'thinking.json',
  };
}
