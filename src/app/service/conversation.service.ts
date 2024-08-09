import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../type/conversation.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/conversations`;

  getConversationList(page = 1, limit = 10): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(
      `${this.url}?page=${page}&limit=${limit}`
    );
  }

  getConversation(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.url}/${id}`);
  }
}
