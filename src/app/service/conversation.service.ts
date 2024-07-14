import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../type/conversation.type';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private http = inject(HttpClient);
  private url='https://think-therefore-be-api.azurewebsites.net/conversations';
  // private url = 'http://localhost:3000/conversations';

  constructor() {}

  getConversationList(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.url);
  }

  getConversation(id: string): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.url}/${id}`);
  }
}
