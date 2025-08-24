import { Component, inject, signal } from '@angular/core';
import { MoodPickerComponent } from '../mood-picker/mood-picker.component';
import { AnimatedTextareaComponent } from '../animated-textarea/animated-textarea.component';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { TimelineChartComponent } from '../timeline-chart/timeline-chart.component';
import { QuoteCardComponent } from '../quote-card/quote-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-journal',
  imports: [MoodPickerComponent, AnimatedTextareaComponent, FormsModule, TimelineChartComponent, QuoteCardComponent, CommonModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {
  private api = inject(ApiService);

  emoji = signal<string>('');
  note = signal<string>('');
  quote = signal<any | null>(null);
  history = signal<{ date: string; emoji: string; tag: string }[]>([]);

  tags = ['happy', 'calm', 'grateful', 'focused', 'tired', 'sad', 'stressed'];
  tagModel = this.tags[0];

  constructor() {
    this.loadHistory();
  }

  canSave() { return !!this.emoji() && this.note().trim().length > 0; }

  onPick(e: string) { this.emoji.set(e); }

  async save() {
    const today = new Date().toISOString().slice(0, 10);
    this.api.createMood({ emoji: this.emoji(), tag: this.tagModel, note: this.note(), date: today })
      .subscribe(res => {
        this.quote.set({
          text: res.quote.ayah,         // use ayah as text
          author: res.quote.translation // or whatever field you want as "author"
        });
        this.loadHistory();
        this.note.set('');
      });
  }

  loadHistory() {
    this.api.getHistory(30).subscribe(d => this.history.set(d));
  }
}
