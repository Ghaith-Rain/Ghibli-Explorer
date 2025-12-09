import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverFloat]',
  standalone: true
})
export class HoverFloatDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Add transition for smooth animation
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease-in-out');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-8px)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
  }
}
