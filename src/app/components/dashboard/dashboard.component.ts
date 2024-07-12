import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';
import { MenuService } from '../../shared/services/menu.service';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonPrimaryDirective, HeaderComponent, RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('topElement') topElement!: ElementRef;

  isMenuOpen: boolean = false;

  isIntro: boolean = true;


  constructor(private authService: AuthService, private dataService: DataService, public menuService: MenuService, private scrollService: ScrollService) { }

  ngOnInit() {
    setInterval(async () => {
      let response = await this.authService.refreshToken();
      this.authService.setAccessToken(response.access);
    }, 1000 * 60 * 4);

    // play intro audio file
    let audio = new Audio();
    audio.src = "../../../assets/intro.mp3";
    audio.load();
    audio.play();

    setTimeout(() => {
      this.isIntro = false;
    }, 3000);

    this.dataService.getUser();
    this.dataService.getWatchlist();
    this.dataService.getVideos();
    this.dataService.getGenres();
    this.dataService.getActors();
  }


  ngAfterViewInit() {
    this.scrollService.setElement(this.topElement);
  }
}
