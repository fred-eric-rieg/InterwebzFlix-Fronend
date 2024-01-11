import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule, Location } from '@angular/common';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule, ButtonSecondaryDirective],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {


  constructor(public dataService: DataService, private _location: Location) { }


  goBack() {
    this._location.back();
  }

}
