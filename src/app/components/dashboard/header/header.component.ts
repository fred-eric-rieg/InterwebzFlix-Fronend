import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonPrimaryDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private menuService: MenuService) { }


  toggleMenu() {
    this.menuService.toggleMenu();
  }

  
}
