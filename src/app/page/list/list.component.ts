import { Component, inject, OnInit } from '@angular/core';
import { ConversationService } from '../../service/conversation.service';
import { CardModule } from 'primeng/card';
import { Conversation } from '../../type/conversation.type';
import { AsyncPipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageComponent } from '../../component/message/message.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardModule,
    AsyncPipe,
    MarkdownModule,
    RouterModule,
    ButtonModule,
    MessageComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private conversationService = inject(ConversationService);
  private router = inject(Router);
  conversationList$ = this.conversationService.getConversationList();
  conversationList: Conversation[] = [];

  ngOnInit(): void {}

  gotoQuestion(id: string): void {
    this.router.navigate(['think', id]);
  }

  getString(text:string): string {
    // console.log(text);
    // return `${text.substring(0, 50)}...`
    return text;
  }
}
