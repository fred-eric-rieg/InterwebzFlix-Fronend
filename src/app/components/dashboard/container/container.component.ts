import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

  constructor(public dataService: DataService) { }


  selectVideo(video: any) {
    this.dataService.selectedVideo.next(video)
  }
}
