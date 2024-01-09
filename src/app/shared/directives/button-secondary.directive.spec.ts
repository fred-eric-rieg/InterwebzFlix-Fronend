import { ButtonSecondaryDirective } from './button-secondary.directive';
import { ElementRef, Renderer2 } from '@angular/core';

let el: ElementRef;
let renderer: Renderer2;

describe('ButtonSecondaryDirective', () => {
  it('should create an instance', () => {
    const directive = new ButtonSecondaryDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
