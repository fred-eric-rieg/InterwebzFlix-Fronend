import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ButtonPrimaryDirective, ButtonSecondaryDirective, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit(): void {
  }


  goToMain() {
    this.router.navigate(['/dashboard/main']);
  }

}
