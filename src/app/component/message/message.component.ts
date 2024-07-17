import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnChanges{
  @Input({required:true}) message!: Message;

  ngOnChanges(changes: SimpleChanges): void {

  }
}
