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
import { finalize, switchMap, tap } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MarkdownModule } from 'ngx-markdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ConversationService } from '../../service/conversation.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Conversation, Message } from '../../type/conversation.type';
import { CardModule } from 'primeng/card';
import { QuestionInputComponent } from '../../component/question-input/question-input.component';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
  ],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.scss',
})
export class AskComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private askService = inject(AskService);
  private conversationService = inject(ConversationService);
  private router = inject(Router);
  isLoading = false;

  askForm = new FormGroup({
    question: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    precondition: new FormControl<string>('a', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
  conversation: Conversation | null = null;
  preconditionOptions: any[] = [
    { name: '整理脈絡', value: 'a' },
    { name: '批判', value: 'b' },
    { name: '跟十歲小孩解釋', value: 'c' },
    { name: '第一性原理', value: 'd' },
    { name: '情感和心理層面', value: 'e' },
    { name: '反思', value: 'f' },
  ];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getConversation(params['id']);
      }
    });
  }

  askQuestion(question: string): void {
    this.isLoading = true;
    const { precondition } = this.askForm.getRawValue();

    this.conversation
      ? this.continousQuestion(
          question,
          precondition,
          this.conversation._id,
          this.conversation.messages
        )
      : this.firstQuestion(question, precondition);
  }

  firstQuestion(question: string, precondition: string): void {
    this.askService
      .askGemini(question, precondition)
      .pipe(
        tap((conversation) => {
          this.conversation = conversation;
          this.isLoading = false;
          console.log(this.conversation);
        }),
        switchMap((conversation) => {
          return this.askService
            .askGemini('', 'b', conversation._id, conversation.messages)
            .pipe(finalize(() => (this.isLoading = false)));
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((conversation) => {
        this.conversation = conversation;
        console.log(this.conversation);
      });
  }

  continousQuestion(
    question: string,
    precondition: string,
    id: string,
    messageList: Message[]
  ): void {
    this.askService
      .askGemini(question, precondition as string, id, messageList)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((conversation) => {
        this.conversation = conversation;
        console.log(this.conversation);
      });
  }

  newQuestion(): void {
    this.conversation = null;
    this.router.navigate(['/think']);
  }

  getConversation(id: string): void {
    this.conversationService.getConversation(id).subscribe((conversation) => {
      this.conversation = conversation;
      console.log(conversation);
    });
  }
}
