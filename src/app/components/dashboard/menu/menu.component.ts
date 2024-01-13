import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ButtonPrimaryDirective, ButtonSecondaryDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  constructor(private router: Router, private authService: AuthService, private menuService: MenuService) {}


  goToProfile() {
    this.router.navigate(['/dashboard/profile']);
    this.menuService.toggleMenu();
  }


  logout() {
    this.authService.logout();
    console.log('%cTokens deleted - logout successful.', 'color: yellow');
    this.router.navigate(['login']);
  }

}
