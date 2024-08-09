import { Component, inject } from '@angular/core';
import { ConversationService } from '../../service/conversation.service';
import { CardModule } from 'primeng/card';
import { AsyncPipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageComponent } from '../../component/message/message.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
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
    PaginatorModule,
    TranslateModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private conversationService = inject(ConversationService);
  private router = inject(Router);
  conversationList$ = this.conversationService.getConversationList();

  gotoQuestion(id: string): void {
    this.router.navigate(['think', id]);
  }

  getString(text: string): string {
    return `${text.substring(0, 50)}...`
  }

  first: number = 0;

  rows: number = 10;

  onPageChange(event: PaginatorState) {
    const { page, rows } = event;
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    console.log(this.first, this.rows);
    this.conversationList$ = this.conversationService.getConversationList(
      (page ?? 0) + 1,
      rows
    );
  }
}
