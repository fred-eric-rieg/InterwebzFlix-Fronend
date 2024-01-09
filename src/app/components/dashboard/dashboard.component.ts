import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { BillboardComponent } from './billboard/billboard.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonPrimaryDirective, BillboardComponent, HeaderComponent, ContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @ViewChild('slideMenu') slideMenu: ElementRef;
  isMenuOpen: boolean = false;

  @ViewChild('scifi_1') scifi_1: ElementRef;
  @ViewChild('scifi_title') scifi_title: ElementRef;

  constructor(private renderer: Renderer2) {
    this.slideMenu = new ElementRef('');
    this.scifi_1 = new ElementRef('');
    this.scifi_title = new ElementRef('');
  }
}
