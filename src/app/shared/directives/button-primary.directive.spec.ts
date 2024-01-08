import { ElementRef, Renderer2 } from '@angular/core';
import { ButtonPrimaryDirective } from './button-primary.directive';

let el: ElementRef;
let renderer: Renderer2;

describe('ButtonPrimaryDirective', () => {
  it('should create an instance', () => {
    const directive = new ButtonPrimaryDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});


describe('ButtonPrimaryDirective', () => {
  let directive: ButtonPrimaryDirective;

  beforeEach(() => {
    directive = new ButtonPrimaryDirective(el, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the background color of the host element', () => {
    const elementRefMock = {
      nativeElement: document.createElement('div')
    };
    const rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle']);

    directive.el = elementRefMock;
    directive.renderer = rendererMock;

    directive.ngOnInit();

    expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'background-color', jasmine.any(String));
  });

  it('should set the border radius of the host element', () => {
    // Test code here
  });

  it('should set the border of the host element', () => {
    // Test code here
  });

  it('should set the color of the host element', () => {
    // Test code here
  });

  it('should set the padding of the host element', () => {
    // Test code here
  });

  it('should set the cursor of the host element', () => {
    // Test code here
  });

  it('should set the font size of the host element', () => {
    // Test code here
  });

  it('should set the max width of the host element', () => {
    // Test code here
  });

  it('should set the width of the host element', () => {
    // Test code here
  });

  it('should set the white space of the host element', () => {
    // Test code here
  });
});