import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Conversation, Message } from '../type/conversation.type';
import { Lang } from '../enum/lang.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AskService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/gemini`;
  private translateService = inject(TranslateService);

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
        return {
          role,
          parts: parts.map((part) => {
            return { text: part.text };
          }),
        };
      });
      body = {
        prompt: question,
        precondition,
        lang: this.translateService.currentLang as Lang,
        id,
        messageList,
      };
    } else {
      body = {
        prompt: question,
        precondition,
        lang: this.translateService.currentLang as Lang,
      };
    }

    console.log(body);

    return this.http.post<Conversation>(this.url, body);
  }
}
