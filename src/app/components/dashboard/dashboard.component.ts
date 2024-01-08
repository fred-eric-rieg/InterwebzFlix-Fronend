import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { BgVideoComponent } from './bg-video/bg-video.component';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BgVideoComponent, ButtonPrimaryDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @ViewChild('slideMenu') slideMenu: ElementRef;
  isMenuOpen: boolean = false;

  constructor(private renderer: Renderer2) {
    this.slideMenu = new ElementRef('');
  }


  openMenu() {
    if (this.isMenuOpen) {
      this.renderer.addClass(this.slideMenu.nativeElement, 'slide-out');
      this.renderer.removeClass(this.slideMenu.nativeElement, 'slide-in');
    } else {
      this.renderer.addClass(this.slideMenu.nativeElement, 'slide-in');
      this.renderer.removeClass(this.slideMenu.nativeElement, 'slide-out');
    }
    this.isMenuOpen = !this.isMenuOpen;
  }
}
