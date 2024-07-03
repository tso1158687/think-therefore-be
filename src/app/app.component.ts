import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AskService } from './service/ask.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private askService = inject(AskService);
  title = 'think-therefore-be';
  currentQuestion = '';
  answer=''
  ngOnInit(): void {}

  askQuestion():void {
    this.askService.askGemini(this.currentQuestion).subscribe((response) => {
      console.log(response)
      this.answer = response;
    });
  }
}
