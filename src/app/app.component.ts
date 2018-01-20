import { OnInit, ElementRef, ViewChild, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('subtitle') subtitle: ElementRef;

  ngOnInit() {
    // Setup the canvas
    const el: HTMLCanvasElement = this.canvas.nativeElement;
    el.width = 2560;
    el.height = 1440;
    const ctx = el.getContext('2d');

    // Outline elements
    const title: HTMLHeadElement = this.title.nativeElement;
    const subtitle: HTMLHeadElement = this.subtitle.nativeElement;
    this.drawRect(ctx, title);
    this.drawRect(ctx, subtitle);
  }

  drawRect(ctx: CanvasRenderingContext2D, element: HTMLElement) {
    const x = element.offsetLeft;
    const y = element.offsetTop;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }
}
