import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface MoodPayload {
  emoji: string;
  tag: string;
  note: string;
  date: string; // YYYY-MM-DD
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private base = 'http://localhost:4000';

  constructor() { }

  createMood(payload: MoodPayload) {
    return this.http.post<{
      saved: any;
      quote: {
        ayah: string;
        translation: string;
        reference: string;
      }
    }>(`${this.base}/moods`, payload);
  }

  getRecent(limit = 30) {
    return this.http.get<any[]>(`${this.base}/moods?limit=${limit}`);
  }

  getHistory(days = 30) {
    return this.http.get<{ date: string; emoji: string; tag: string }[]>(`${this.base}/moods/history?days=${days}`);
  }
}
