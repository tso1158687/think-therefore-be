import { Routes } from '@angular/router';
import { IntroComponent } from './page/intro/intro.component';
import { AskComponent } from './page/ask/ask.component';

export const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  {
    path: 'think',
    component: AskComponent,
  },
];
