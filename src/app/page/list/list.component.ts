import { Component, inject, OnInit } from '@angular/core';
import { ConversationService } from '../../service/conversation.service';
import { CardModule } from 'primeng/card';
import { Conversation } from '../../type/conversation.type';
import { AsyncPipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, AsyncPipe, MarkdownModule, RouterModule, ButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private conversationService = inject(ConversationService);
  private router = inject(Router);
  conversationList$ = this.conversationService.getConversationList();
  conversationList: Conversation[] = [];

  ngOnInit(): void {
    this.conversationService.getConversationList().subscribe((data) => {
      console.log(data);
    });
  }

  gotoQuestion(id: string): void {
    this.router.navigate(['/think'], { queryParams: { c: id } });
  }
}
