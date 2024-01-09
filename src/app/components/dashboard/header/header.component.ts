import { Component } from '@angular/core';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonPrimaryDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
