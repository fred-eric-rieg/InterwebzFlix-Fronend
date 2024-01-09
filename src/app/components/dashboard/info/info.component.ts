import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ButtonSecondaryDirective, ButtonPrimaryDirective, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {

  constructor(private router: Router, public dataService: DataService) {
  }


  playMovie() {
    console.log('playMovie');
  }


  goToMain() {
    this.router.navigate(['/dashboard/main']);
  }
}
