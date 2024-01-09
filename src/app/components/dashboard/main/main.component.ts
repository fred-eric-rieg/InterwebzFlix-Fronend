import { Component } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { CommonModule, DatePipe } from '@angular/common';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ContainerComponent, ButtonSecondaryDirective, ButtonPrimaryDirective, DatePipe, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(public dataService: DataService, private router: Router) { }


  ngOnInit() {
    console.log('ngOnInit');
  }


  goToInfo() {
    console.log('goToInfo');
    this.router.navigate(['/dashboard/info']);
  }
}
