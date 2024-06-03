import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private MY_API_KEY = '';

  constructor(private http: HttpClient) { }

  getResponse(messages: {role: string, content: string}[]): Observable<any> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.MY_API_KEY}`
    });
    
    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7
    };
  
    return this.http.post(this.apiUrl, body, {headers: headers});
  }

}
