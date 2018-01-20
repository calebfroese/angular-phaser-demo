import {
  ViewContainerRef,
  OnInit,
  ElementRef,
  ViewChild,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: any;

  @ViewChild('page') page: ElementRef;
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('subtitle') subtitle: ElementRef;

  ngOnInit() {
    // Setup the canvas
    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = this.page.nativeElement.offsetWidth;
    this.canvas.height = this.page.nativeElement.offsetHeight;
    this.ctx = this.canvas.getContext('2d');

    const FPS = 30;
    setInterval(() => {
      this.redraw();
    }, FPS);
  }

  drawRect(ctx: CanvasRenderingContext2D, element: HTMLElement) {
    const x = element.offsetLeft;
    const y = element.offsetTop;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);

    // Outline elements
    const title: HTMLHeadElement = this.title.nativeElement;
    const subtitle: HTMLHeadElement = this.subtitle.nativeElement;
    this.drawRect(this.ctx, title);
    this.drawRect(this.ctx, subtitle);
  }
}
