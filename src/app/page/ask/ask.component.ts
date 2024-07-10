import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AskService } from '../../service/ask.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [
    InputTextareaModule,
    ButtonModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.scss',
})
export class AskComponent {
  private askService = inject(AskService);
  isLoaded = false;
  answer = '';
  askForm = new FormGroup({
    question: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    precondition: new FormControl('a', [Validators.required]),
  });

  preconditionOptions: any[] = [
    { name: '整理脈絡', value: 'a' },
    { name: '批判', value: 'b' },
    { name: '綜合', value: 'c' },
  ];

  askQuestion(): void {
    this.isLoaded = true;
    const {question,precondition}=this.askForm.value;
    this.askService
      .askGemini2((question as string), (precondition as string))
      .pipe(finalize(() => (this.isLoaded = false)))
      .subscribe((response) => {
        console.log(response);
        this.answer = response;
      });
  }
}
