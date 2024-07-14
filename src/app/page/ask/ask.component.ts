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
    CardModule
  ],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.scss',
})
export class AskComponent implements OnInit {
  private router = inject(Router);
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

  conversation!: Conversation ;

  conversationList: any[] = [];

  preconditionOptions: any[] = [
    { name: '整理脈絡', value: 'a' },
    { name: '批判', value: 'b' },
    { name: '綜合(不要點)', value: 'c' },
  ];

  ngOnInit(): void {
    // this.getConversationList();
    if (this.activatedRoute.snapshot.queryParams['c']) {
      this.getConversation(this.activatedRoute.snapshot.queryParams['c']);
    }
  }

  askQuestion(): void {
    this.isLoaded = true;
    const { question, precondition } = this.askForm.value;
    this.askService
      .askGemini2(question as string, precondition as string)
      .pipe(finalize(() => (this.isLoaded = false)))
      .subscribe((response) => {
        console.log(response);
        this.answer = response;
      });
  }

  getConversationList() {
    this.conversationService
      .getConversationList()
      .subscribe((conversationList) => {
        console.log(conversationList);
        this.conversationList = conversationList as any[];
      });
  }

  getConversation(id: string) {
    this.conversationService.getConversation(id).subscribe((conversation) => {
      this.conversation = conversation;
      console.log(conversation);
    });
  }
}
