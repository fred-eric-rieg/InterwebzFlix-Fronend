import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonPrimaryDirective, HeaderComponent, RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isMenuOpen: boolean = false;

  isIntro: boolean = true;


  constructor(private authService: AuthService, private dataService: DataService, public menuService: MenuService) { }

  ngOnInit() {
    setInterval(async () => {
      let response = await this.authService.refreshToken();
      this.authService.setAccessToken(response.access);
    }, 1000 * 60 * 4);

    setTimeout(() => {
      this.isIntro = false;
    }, 3000);

    this.dataService.getUser();
    this.dataService.getWatchlist();
    this.dataService.getVideos();
    this.dataService.getGenres();
    this.dataService.getActors();
  }
}
