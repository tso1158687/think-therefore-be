import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AskService } from '../../service/ask.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { finalize } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MarkdownModule } from 'ngx-markdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ConversationService } from '../../service/conversation.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Conversation } from '../../type/conversation.type';
import { CardModule } from 'primeng/card';
import { QuestionInputComponent } from '../../component/question-input/question-input.component';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [
    InputTextareaModule,
    ButtonModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    ReactiveFormsModule,
    MarkdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    RouterModule,
    CardModule,
    QuestionInputComponent,
  ],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.scss',
})
export class AskComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private askService = inject(AskService);
  private conversationService = inject(ConversationService);
  isLoaded = false;
  answer = '';
  askForm = new FormGroup({
    question: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    precondition: new FormControl('a', [Validators.required]),
  });
  conversation!: Conversation;
  preconditionOptions: any[] = [
    { name: '整理脈絡', value: 'a' },
    { name: '批判', value: 'b' },
    { name: '跟十歲小孩解釋', value: 'c' },
  ];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getConversation(params['id']);
      }
    });
  }

  askQuestion(question: string): void {
    this.isLoaded = true;
    const { precondition } = this.askForm.value;
    console.log(this.conversation);
    if (this.conversation) {
      console.log('has conversation');
      console.log(this.conversation._id);
      console.log(this.conversation.messages);
      this.askService
        .askGemini(
          question,
          precondition as string,
          this.conversation._id,
          this.conversation.messages
        )
        .pipe(finalize(() => (this.isLoaded = false)))
        .subscribe((conversation) => {
          this.conversation = conversation;
          console.log(this.conversation);

        });
    } else {
      console.log('no conversation');
      this.askService
        .askGemini(question, precondition as string)
        .pipe(finalize(() => (this.isLoaded = false)))
        .subscribe((conversation) => {
          this.conversation= conversation;
          console.log(this.conversation);
        });
    }
    // this.askService
    //   .askGemini2(question as string, precondition as string)
    //   .pipe(finalize(() => (this.isLoaded = false)))
    //   .subscribe((response) => {
    //     console.log(response);
    //     this.answer = response;
    //   });
  }

  getConversation(id: string) {
    this.conversationService.getConversation(id).subscribe((conversation) => {
      this.conversation = conversation;
      console.log(conversation);
    });
  }
}
