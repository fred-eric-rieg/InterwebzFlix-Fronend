import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private element!: ElementRef;

  constructor() { }


  getElement() {
    return this.element;
  }

  setElement(element: ElementRef) {
    this.element = element;
  }
}
