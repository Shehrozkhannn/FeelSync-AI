import { NgFor, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mood-picker',
   standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './mood-picker.component.html',
  styleUrl: './mood-picker.component.css'
})
export class MoodPickerComponent {
  @Input() selected = '';
  @Output() pick = new EventEmitter<string>();
  emojis = ['😀','😄','😊','🙂','😌','😴','😕','😟','😢','😤','😠','😬','🥳','🤗','🤔','😎','😇','🤩','😅','😭','😮','😴','🤒','🤯','😌','🫶','❤️'];
}
