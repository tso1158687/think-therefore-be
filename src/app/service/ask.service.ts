import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AskService {
  private http = inject(HttpClient);
  private url='https://think-therefore-be-api.azurewebsites.net/gemini';
  // private url = 'http://localhost:3000/gemini';
  constructor() {}

  // askGemini(prompt: string): Observable<string> {
  //   const url = `https://think-therefore-be-api.azurewebsites.net/gemini?prompt=${prompt}`;
  //   // return this.http.get<string>(url, { responseType: 'text' });
  //   return this.http.get(url, { responseType: 'text' });
  // }

  askGemini2(question: string, precondition: string): Observable<string> {
    const body = {
      prompt: question,
      precondition,
    };
    console.log(body)
    return this.http.post<string>(this.url, body, {
      responseType: 'text' as any,
    });
  }
}
