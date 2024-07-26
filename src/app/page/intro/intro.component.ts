import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  options: AnimationOptions = {
    path: 'thinking.json',
  };
}
