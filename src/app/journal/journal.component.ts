import { Component, inject, signal } from '@angular/core';
import { AnimatedTextareaComponent } from '../animated-textarea/animated-textarea.component';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { QuoteCardComponent } from '../quote-card/quote-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-journal',
  imports: [AnimatedTextareaComponent, FormsModule, QuoteCardComponent, CommonModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {
  private api = inject(ApiService);
  note = signal<string>('');
  quote = signal<any | null>(null);
  history = signal<{ date: string; tag: string }[]>([]);

  tags = ['happy', 'calm', 'grateful', 'focused', 'tired', 'sad', 'stressed'];
  tagModel = this.tags[0];
  suggestedTag = signal<string | null>(null);

  constructor() {
    this.loadHistory();
  }

  canSave() { return this.note().trim().length > 0; }


  async save() {
    const today = new Date().toISOString().slice(0, 10);
    this.api.createMood({ tag: this.tagModel, note: this.note(), date: today })
      .subscribe(res => {
        this.quote.set({
          text: res.quote.ayah,         // use ayah as text
          author: res.quote.translation // or whatever field you want as "author"
        });
        this.loadHistory();
        this.note.set('');
        this.suggestedTag.set(res.suggestedTag);
      });
  }

  loadHistory() {
    this.api.getHistory(30).subscribe((d:any) => this.history.set(d));
    console.log('history', this.history());
  }
}
