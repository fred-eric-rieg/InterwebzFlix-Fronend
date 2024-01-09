import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonPrimaryDirective, HeaderComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  constructor() { }
}
