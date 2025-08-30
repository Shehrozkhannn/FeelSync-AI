// timeline-chart.component.ts
import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

Chart.register(...registerables, MatrixController, MatrixElement);

type HeatCell = { date: string; mood: string; value: number };

@Component({
  selector: 'app-timeline-chart',
  template: `<canvas #cnv></canvas>`,
  styles: [`
    :host { display:block; }
    canvas { width:100%; height:160px; }
  `]
})
export class TimelineChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('cnv', { static: true }) cnv!: ElementRef<HTMLCanvasElement>;
  @Input() data: any[] = [];

  chart?: Chart;

  ngAfterViewInit() { this.render(); }
  ngOnChanges(_: SimpleChanges) { this.render(); }

  private render() {
    if (!this.cnv) return;

    // Build calendar grid left->right by weeks, top->bottom by week index
    // Align by date order already provided from backend
    const cells = (this.data || []);
    if (!cells.length) {
      this.destroy();
      this.chart = new Chart(this.cnv.nativeElement, {
        type: 'matrix',
        data: { datasets: [{ data: [] }] },
        options: { responsive: true }
      });
      return;
    }

    // position: 7 columns, many rows
    const items = cells.map((d, i) => ({
      x: i % 7,
      y: Math.floor(i / 7),
      v: d.value,
      mood: d.mood,
      date: d.date
    }));

    const colorFor = (v: number, mood: string) => {
      if (v === 0) return 'rgba(230,230,230,1)';              // empty
      if (mood === 'gratitude' || v === 3) return 'rgba(56, 142, 60, 0.9)';   // green
      if (mood === 'happy'  || v === 2) return 'rgba(255, 202, 40, 0.9)';  // yellow
      if (mood === 'sadness'   || v === 1) return 'rgba(229, 57, 53, 0.9)';   // red
      if (mood === 'calmness' || mood === 'trust') return 'rgba(30, 136, 229, 0.9)'; // blue
      return 'rgba(158, 158, 158, 0.9)'; // fallback
    };

    const ctx = this.cnv.nativeElement.getContext('2d')!;
    this.destroy();
    this.chart = new Chart(ctx, {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'Mood history',
          data: items,
          backgroundColor: (c: any) => {
            const r = c.raw;
            return colorFor(r?.v ?? 0, r?.mood ?? '');
          },
          borderWidth: 1,
          borderColor: '#fff',
          width: 16,
          height: 16,
          hoverBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: { display: false, offset: true },
          y: { display: false, offset: true }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items: any) => items[0]?.raw?.date || '',
              label: (item: TooltipItem<'matrix'>) => {
                const r: any = item.raw;
                const mood = r?.mood || 'no entry';
                return `Mood: ${mood}`;
              }
            }
          }
        },
        // click to “re-read ayah” for that day — emits a custom event you can handle
        onClick: (_e, els) => {
          const el = els?.[0] as any;
          const r = el?.element?.$context?.raw;
          if (r?.date) {
            const ev = new CustomEvent('heatmapDayClick', { detail: { date: r.date } });
            this.cnv.nativeElement.dispatchEvent(ev);
          }
        }
      }
    });
  }

  private destroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}
