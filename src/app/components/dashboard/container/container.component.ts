import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from "../../../shared/pipes/filter.pipe";
import { WatchlistPipe } from "../../../shared/pipes/watchlist.pipe";
import { ScrollService } from '../../../shared/services/scroll.service';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { Router } from '@angular/router';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: './container.component.scss',
    imports: [CommonModule, FilterPipe, WatchlistPipe, ButtonPrimaryDirective, ButtonSecondaryDirective]
})
export class ContainerComponent {

  // Access the DOM element with the reference variable 'shortRef'
  @ViewChildren('listRef') listRef!: QueryList<ElementRef>;
  @ViewChildren('tutRef') tutRef!: QueryList<ElementRef>;
  @ViewChildren('newRef') newRef!: QueryList<ElementRef>;
  @ViewChildren('shortRef') shortRef!: QueryList<ElementRef>;


  constructor(public dataService: DataService, private scrollService: ScrollService, private renderer: Renderer2, private router: Router) { }


  selectVideo(video: any) {
    this.dataService.setSelectedVideo(video);
    // scroll to the top of the page
    const element = this.scrollService.getElement();
    element.nativeElement.scrollTop = 0;
  }


  showCard(index: number, where: string) {
    const elRef = this.findMatchingElementRef(where);
    const element = elRef?.toArray()[index].nativeElement;
    this.renderer.addClass(element, 'bigger');
  }


  hideCard(index: number, where: string) {
    const elRef = this.findMatchingElementRef(where);
    const element = elRef?.toArray()[index].nativeElement;
    this.renderer.removeClass(element, 'bigger');
  }


  findMatchingElementRef(where: string) {
    if (where === 'list') {
      return this.listRef;
    } else if (where === 'tut') {
      return this.tutRef;
    } else if (where === 'new') {
      return this.newRef;
    } else if (where === 'short') {
      return this.shortRef;
    } else {
      return;
    }
  }

  playMovie(video: any) {
    this.dataService.setSelectedVideo(video);
    this.router.navigate(['/dashboard/video']);
  }


  goToInfo(video: any) {
    this.dataService.setSelectedVideo(video);
    this.router.navigate(['/dashboard/info']);
  }
}
