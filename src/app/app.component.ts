import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { StarsBackgroundComponent } from './stars-background/stars-background.component';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { trigger, style, animate, transition, group, query, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [JournalComponent, StarsBackgroundComponent, CommonModule, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    animations: [
    trigger('slideTransition', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'mood-journal-app';
  showLoader = false;
  showLanding = true;

  onStartApp() {
    this.showLanding = false;
  }
}
