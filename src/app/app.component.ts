import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AskService } from './service/ask.service';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './component/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,

    ButtonModule,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private askService = inject(AskService);
  title = 'think-therefore-be';
  currentQuestion = '';
  answer = '';
  value = 'taipei';
  ngOnInit(): void {}

  askQuestion(): void {
    this.askService.askGemini(this.currentQuestion).subscribe((response) => {
      console.log(response);
      this.answer = response;
    });
  }
}
