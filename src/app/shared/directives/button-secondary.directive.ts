import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[secondaryButton]',
  standalone: true
})
export class ButtonSecondaryDirective implements OnInit {

  constructor(public el: ElementRef, public renderer: Renderer2) { }
  

  ngOnInit() {
    // Get computed styles from document's root element :root
    const style = getComputedStyle(document.documentElement);

    // Get value of css variable --dark-secondary
    const secondary = style.getPropertyValue('--dark-secondary');
    const tertiary = style.getPropertyValue('--dark-tertiary');

    // Set background color of host element
    this.renderer.setStyle(this.el.nativeElement, 'background-color', secondary);

    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '5px');
    this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '16px');
    this.renderer.setStyle(this.el.nativeElement, 'max-width', '200px');
    this.renderer.setStyle(this.el.nativeElement, 'min-width', '120px');
    this.renderer.setStyle(this.el.nativeElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 225ms ease-in-out');

    // Set hover styles
    this.renderer.listen(this.el.nativeElement, 'mouseover', () => {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', tertiary);
    });
    this.renderer.listen(this.el.nativeElement, 'mouseout', () => {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', secondary);
    });
  }
}
