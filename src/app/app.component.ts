import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  player: any = { x: 20, y: 0 };

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

    this.redraw();
    const FPS = 30;
    setInterval(() => {
      this.redraw();
    }, 1000 / FPS);
  }

  drawRect(ctx: CanvasRenderingContext2D, element: HTMLElement) {
    const x = element.offsetLeft;
    const y = element.offsetTop;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.closePath();
  }

  drawPlayer(ctx: CanvasRenderingContext2D) {
    this.player.y += 1;
    ctx.beginPath();
    ctx.rect(this.player.x, this.player.y, 20, 50);
    ctx.stroke();
    ctx.closePath();
  }

  redraw() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);

    // Outline elements
    const title: HTMLHeadElement = this.title.nativeElement;
    const subtitle: HTMLHeadElement = this.subtitle.nativeElement;
    this.drawRect(this.ctx, title);
    this.drawRect(this.ctx, subtitle);
    this.drawPlayer(this.ctx);
  }
}
