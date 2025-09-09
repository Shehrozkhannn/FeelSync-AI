import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { AnimatedTextareaComponent } from '../animated-textarea/animated-textarea.component';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { QuoteCardComponent } from '../quote-card/quote-card.component';
import { CommonModule } from '@angular/common';
import { ShareCardPopupComponent } from '../share-card-popup/share-card-popup.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-journal',
  imports: [AnimatedTextareaComponent, FormsModule, QuoteCardComponent, CommonModule, MatButtonModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {
  private api = inject(ApiService);
  note = signal<string>('');
  quote = signal<any | null>(null);
  history = signal<{ date: string; tag: string }[]>([]);
  suggestedTag = signal<string | null>(null);
  ayahCard = signal<any | null>(null);
  showSharePopup = signal(false);
  readonly dialog = inject(MatDialog)
  @Input() showLoader: any
  @Output() showLoaderChange = new EventEmitter<boolean>();

  constructor() {
  }

  canSave() { return this.note().trim().length > 0; }


  async save() {
    this.showLoaderChange.emit(true);

    const today = new Date().toISOString().slice(0, 10);
    this.api.createMood({ note: this.note(), date: today })
      .subscribe({
        next: res => {
          this.quote.set({
            text: res.quote.ayah,
            author: res.quote.translation
          });
          this.ayahCard.set({
            text: res.quote.ayah,
            translation: res.quote.translation,
          });
          this.note.set('');
          this.suggestedTag.set(res.suggestedTag);
        },
        error: err => {
          console.error('Error while Fetching Ayah:', err);
          this.showLoaderChange.emit(false);
        },
        complete: () => {
          this.showLoaderChange.emit(false);
        }
      });
  }

  openShare() {
    this.ayahCard.set({
      text: this.quote()?.text,
      translation: this.quote()?.author,
    });
    this.showSharePopup.set(true);
  }

  closeShare() {
    this.showSharePopup.set(false);
  }

  openDialog() {
    this.dialog.open(ShareCardPopupComponent, {
      data: this.ayahCard(),
      width: '500px',
    });
  }
}
