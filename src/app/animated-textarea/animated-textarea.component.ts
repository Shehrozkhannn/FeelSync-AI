import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-animated-textarea',
   standalone: true,
  imports: [],
  templateUrl: './animated-textarea.component.html',
  styleUrl: './animated-textarea.component.css'
})
export class AnimatedTextareaComponent {
  @Input() placeholder = 'Type here...';
  @Output() valueChange = new EventEmitter<string>();
}
