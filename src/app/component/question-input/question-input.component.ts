import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-question-input',
  standalone: true,
  imports: [
    InputTextareaModule,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './question-input.component.html',
  styleUrl: './question-input.component.scss',
})
export class QuestionInputComponent {
  @Output() askQuestionEvent = new EventEmitter<string>();
  @Output() newQuestionEvent = new EventEmitter<void>();
  question = '';

  askQuestion(): void {
    this.askQuestionEvent.emit(this.question);
    this.question = '';
  }
  newQuestion(): void {
    this.newQuestionEvent.emit();
  }
}
