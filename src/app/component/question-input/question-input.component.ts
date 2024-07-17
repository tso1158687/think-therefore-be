import { Component, EventEmitter, Output } from '@angular/core';
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
  ],
  templateUrl: './question-input.component.html',
  styleUrl: './question-input.component.scss',
})
export class QuestionInputComponent {
  @Output() askQuestionEvent = new EventEmitter<string>();


  askQuestion(): void {
    this.askQuestionEvent.emit('test');
  }
}
