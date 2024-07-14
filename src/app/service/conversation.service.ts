import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private http = inject(HttpClient);
  // private url='https://think-therefore-be-api.azurewebsites.net/gemini';
  private url = 'http://localhost:3000/conversations';

  constructor() {}

  getConversationList() {
    return this.http.get(this.url);
  }

  getConversation(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }
}
