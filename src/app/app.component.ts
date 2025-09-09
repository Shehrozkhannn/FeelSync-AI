import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { StarsBackgroundComponent } from './stars-background/stars-background.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [JournalComponent,StarsBackgroundComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mood-journal-app';
  showLoader = false;
}
