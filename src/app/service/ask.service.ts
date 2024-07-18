import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Conversation, Message } from '../type/conversation.type';

@Injectable({
  providedIn: 'root',
})
export class AskService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/gemini`;

  constructor() {}

  askGemini(
    question: string,
    precondition: string,
    id?: string,
    messages?: Message[]
  ): Observable<Conversation> {
    console.log(id);
    console.log(messages);
    let body;
    if (id) {
      const messageList = (messages as Message[]).map((message) => {
        const { role, parts } = message;
        return { role, parts:parts.map(part=>{
          return {text:part.text}
        }) };
      });
      body = {
        prompt: question,
        precondition,
        id,
        messageList,
      };
    } else {
      body = {
        prompt: question,
        precondition,
      };
    }

    console.log(body);

    return this.http.post<Conversation>(this.url, body);
  }

  askGemini2(question: string, precondition: string): Observable<string> {
    const body = {
      prompt: question,
      precondition,
    };
    // console.log(body)
    return this.http.post<string>(this.url, body, {
      responseType: 'text' as any,
    });
  }
}
