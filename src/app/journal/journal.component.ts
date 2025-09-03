import { Component, inject, signal } from '@angular/core';
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
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-journal',
  imports: [AnimatedTextareaComponent, FormsModule, QuoteCardComponent, CommonModule,MatButtonModule],
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

  constructor() {
  }

  canSave() { return this.note().trim().length > 0; }


  async save() {
    const today = new Date().toISOString().slice(0, 10);
    this.api.createMood({ note: this.note(), date: today })
      .subscribe(res => {
        this.quote.set({
          text: res.quote.ayah,         // use ayah as text
          author: res.quote.translation // or whatever field you want as "author"
        });
        this.ayahCard.set({
          text: res.quote.ayah,
          translation: res.quote.translation,
        })
        this.note.set('');
        this.suggestedTag.set(res.suggestedTag);
      });
  }


  shareCardNow() {
    const cardEl = document.querySelector('.share-card') as HTMLElement;
    if (!cardEl) return;

    import('html2canvas').then(html2canvas => {
      html2canvas.default(cardEl).then(canvas => {
        canvas.toBlob(blob => {
          if (!blob) return;

          const file = new File([blob], 'ayah-card.png', { type: 'image/png' });

          if (navigator.share) {
            navigator.share({
              title: 'Daily Ayah',
              text: 'Check out this beautiful ayah!',
              files: [file]
            });
          } else {
            this.downloadCard(); // fallback
          }
        });
      });
    });
  }

  downloadCard() {
    const cardEl = document.querySelector('.share-card') as HTMLElement;
    if (!cardEl) return;

    import('html2canvas').then(html2canvas => {
      html2canvas.default(cardEl).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ayah-card.png';
        link.href = canvas.toDataURL();
        link.click();
      });
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

  moodColor(mood: string | null) {
    switch (mood) {
      case 'happy': return 'linear-gradient(135deg, #FFD54F, #FFB300)'; // warm yellow
      case 'sad': return 'linear-gradient(135deg, #64B5F6, #1E88E5)';  // cool blue
      case 'calm': return 'linear-gradient(135deg, #A5D6A7, #43A047)'; // green
      case 'stressed': return 'linear-gradient(135deg, #FF8A65, #D84315)'; // orange
      case 'grateful': return 'linear-gradient(135deg, #81C784, #388E3C)'; // deep green
      default: return 'linear-gradient(135deg, #E0E0E0, #BDBDBD)';       // neutral
    }
  }

  openDialog() {
    this.dialog.open(ShareCardPopupComponent,{
      data: this.ayahCard(),
      width: '500px',
    });
  }
}
