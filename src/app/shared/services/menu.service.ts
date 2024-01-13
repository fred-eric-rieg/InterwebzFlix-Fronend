import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private isMenuOpen: boolean = false;

  constructor() { }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  isOpen() {
    return this.isMenuOpen;
  }
}
