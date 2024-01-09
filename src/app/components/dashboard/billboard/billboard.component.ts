import { Component } from '@angular/core';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [ButtonSecondaryDirective, ButtonPrimaryDirective],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.scss'
})
export class BillboardComponent {

}
