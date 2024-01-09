import { Component } from '@angular/core';
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


  constructor() { }
}
