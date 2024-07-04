import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AskService } from '../../service/ask.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.scss',
})
export class AskComponent {
  private askService = inject(AskService);
  isLoaded = false;
  currentQuestion = '';
  answer = '';

  askQuestion(): void {
    this.isLoaded = true;
    this.askService
      .askGemini(this.currentQuestion)
      .pipe(finalize(() => (this.isLoaded = false)))
      .subscribe((response) => {
        console.log(response);
        this.answer = response;
      });
  }
}
