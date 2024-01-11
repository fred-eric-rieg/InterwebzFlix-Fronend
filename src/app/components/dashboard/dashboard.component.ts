import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonPrimaryDirective, HeaderComponent, RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isMenuOpen: boolean = false;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    setInterval(async () => {
      let response = await this.authService.refreshToken();
      this.authService.setAccessToken(response.access);
      console.log("%cAccess Token refreshed after 4 minutes.", "color:green");
    }, 1000 * 60 * 4);
  }

  /**
   * Receives the menuToggle event from the header child-component.
   * @param isMenuOpen as boolean.
   */
  handleMenuToggle(isMenuOpen: boolean) {
    this.isMenuOpen = isMenuOpen;
  }
}
