import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quote-card',
  imports: [],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.css'
})
export class QuoteCardComponent {
  @Input() text!: string;
  @Input() author!: string; 
}
