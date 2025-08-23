import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);
@Component({
  selector: 'app-timeline-chart',
  imports: [],
  templateUrl: './timeline-chart.component.html',
  styleUrl: './timeline-chart.component.css'
})
export class TimelineChartComponent {
  @Input() data: { date: string; emoji: string; tag: string }[] = [];
  @ViewChild('cnv', { static: true }) cnv!: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  ngAfterViewInit() { this.render(); }
  ngOnChanges(ch: SimpleChanges) { if (this.chart) this.render(); }

  render() {
    const labels = this.data.map(d => d.date.slice(5)); // MM-DD
    const valueMap: Record<string, number> = {};
    // map emojis/tags to numeric values for a simple line
    const scale: Record<string, number> = { happy: 5, calm: 4, grateful: 4, focused: 4, tired: 2, sad: 1, stressed: 1 };
    const points = this.data.map(d => d.tag ? (scale[d.tag] ?? 3) : 0);

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.cnv.nativeElement.getContext('2d')!, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Mood score',
          data: points,
          fill: true,
          tension: 0.35,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { min: 0, max: 5, ticks: { stepSize: 1 } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
}
