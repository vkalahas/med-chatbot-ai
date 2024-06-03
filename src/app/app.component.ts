import { Component } from '@angular/core';
import { ResponseService } from './response.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private responseService: ResponseService) {}

  title = 'cogent-med-ai-chatbot';

  // TODO: turn OpenAI API message object into a type

  messages: { role: string; content: string }[] = [
    {
      role: 'system',
      content: `You are a helpful assistant, please answer as concisely as possible. 
                If you do not know the answer, please state that you do not know.`,
    },
    {
      role: 'assistant',
      content: 'Any medical questions?',
    },
  ];

  userMessage: string = '';

  // TODO: make it work with first request

  responseMessage: { role: string; content: string } = {
    role: 'assistant',
    content: 'Can you elaborate?',
  };

  sendMessage() {

    this.messages.push({
      role: 'user',
      content: this.userMessage,
    });

    // TODO: disable button until response is received

    let response: string;

    this.responseService.getResponse(this.messages).subscribe({
      next: (data) => {
        this.responseMessage = data.choices[0].message;
      },
      error: (error) => {
        console.error('Error', error);
      },
    });

    this.messages.push(this.responseMessage);

    // clear input
    this.userMessage = '';
  }
}
