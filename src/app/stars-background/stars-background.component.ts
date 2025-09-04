import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-stars-background',
  imports: [],
  templateUrl: './stars-background.component.html',
  styleUrl: './stars-background.component.css'
})
export class StarsBackgroundComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.setBoxShadows('stars', 700, '1px');
    this.setBoxShadows('stars2', 200, '2px');
    this.setBoxShadows('stars3', 100, '3px');
  }

  private setBoxShadows(id: string, count: number, size: string) {
    const elem = this.el.nativeElement.querySelector(`#${id}`);
    if (elem) {
      const shadows = Array.from({ length: count })
        .map(() => `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`)
        .join(',');
      this.renderer.setStyle(elem, 'box-shadow', shadows);
    }
  }
}
