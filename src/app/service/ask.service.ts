import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AskService {
  private http=inject(HttpClient);
  constructor() { }

  askGemini(prompt:string):Observable<string>{
    const url=`https://think-therefore-be-api.azurewebsites.net/gemini?prompt=${prompt}`;
    // return this.http.get<string>(url, { responseType: 'text' });
    return this.http.get(url, { responseType: 'text' });
  }
}
