import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './question-input.component.html',
  styleUrl: './question-input.component.scss',
})
export class QuestionInputComponent {
  @Output() askQuestionEvent = new EventEmitter<string>();
  question = '';

  askQuestion(): void {
    this.askQuestionEvent.emit(this.question);
    this.question = '';
  }
}
