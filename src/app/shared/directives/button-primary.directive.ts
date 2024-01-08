import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[primaryButton]',
  standalone: true
})
export class ButtonPrimaryDirective implements OnInit {

  constructor(public el: ElementRef, public renderer: Renderer2) { }
  

  ngOnInit() {
    // Get computed styles from document's root element :root
    const style = getComputedStyle(document.documentElement);

    // Get value of css variable --dark-primary
    const color = style.getPropertyValue('--dark-primary');

    // Set background color of host element
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);

    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '5px');
    this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '16px');
    this.renderer.setStyle(this.el.nativeElement, 'max-width', '200px');
    this.renderer.setStyle(this.el.nativeElement, 'min-width', '120px');
    this.renderer.setStyle(this.el.nativeElement, 'white-space', 'nowrap');
  }
}
