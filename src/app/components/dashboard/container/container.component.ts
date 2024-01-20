import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from "../../../shared/pipes/filter.pipe";
import { WatchlistPipe } from "../../../shared/pipes/watchlist.pipe";
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.scss',
    imports: [CommonModule, FilterPipe, WatchlistPipe]
})
export class ContainerComponent {

  constructor(public dataService: DataService, private scrollService: ScrollService) { }


  selectVideo(video: any) {
    this.dataService.setSelectedVideo(video);
    // scroll to the top of the page
    const element = this.scrollService.getElement();
    console.log(element);
    element.nativeElement.scrollTop = 0;
  }
}
