import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonPrimaryDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isMenuOpen: boolean = false;

  @Output() menuToggle = new EventEmitter<boolean>();

  constructor() { }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
    console.log("Menu opened.");
  }

  
}
