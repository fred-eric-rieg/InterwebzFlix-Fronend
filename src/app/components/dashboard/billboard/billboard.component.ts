import { Component, OnInit } from '@angular/core';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [ButtonSecondaryDirective, ButtonPrimaryDirective, DatePipe, CommonModule],
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.scss'
})
export class BillboardComponent implements OnInit {

  constructor(public dataService: DataService) { }


  ngOnInit() {

  }
}
