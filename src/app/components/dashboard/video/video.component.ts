import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule, Location } from '@angular/common';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule, ButtonSecondaryDirective, VjsPlayerComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {

  constructor(public dataService: DataService, private _location: Location) { }


  goBack() {
    this._location.back();
  }

}
