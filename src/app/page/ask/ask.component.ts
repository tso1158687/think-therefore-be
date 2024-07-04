import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [FormsModule,InputTextareaModule,],
  templateUrl: './ask.component.html',
  styleUrl: './ask.component.scss'
})
export class AskComponent {
  value=''

}
