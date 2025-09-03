import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface MoodPayload {
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
      suggestedTag: string;
    }>(`${this.base}/moods`, payload);
  }

  getRecent(limit = 30) {
    return this.http.get<any[]>(`${this.base}/moods?limit=${limit}`);
  }

  getHistory(days = 30) {
  return this.http.get<{ date: string; mood: string; value: number }[]>(
    `${this.base}/moods/history?days=${days}`
  );
}
}
