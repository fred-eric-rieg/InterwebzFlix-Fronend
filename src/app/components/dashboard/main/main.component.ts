import { Component, OnDestroy } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { CommonModule, DatePipe } from '@angular/common';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface movies {
  id: number,
  title: string,
  description_short: string,
  description_long: string,
  thumbnail: string,
  video: string,
  user_rating: number,
  reviews: number,
  video_quality: string,
  sound_quality: string,
  genres: number[],
  actors: number[],
  duration: number,
  season_number: number,
  episode_number: number,
  country_of_origin: number,
  age_rating: string,
  subtitles: number[],
  language: number,
  release_date: Date,
  created_at: Date,
  updated_at: Date,
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ContainerComponent, ButtonSecondaryDirective, ButtonPrimaryDirective, DatePipe, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {
  watchlistSub: Subscription;
  watchlist: number[] = [];

  constructor(public dataService: DataService, private router: Router) {
    this.watchlistSub = this.dataService.watchlist$.subscribe((watchlist) => {
      if (watchlist) {
        this.watchlist = watchlist.map((video: movies) => video.id);
      }
    });
  }


  ngOnDestroy() {
    this.watchlistSub.unsubscribe();
  }


  playMovie() {
    this.router.navigate(['/dashboard/video']);
  }


  goToInfo() {
    this.router.navigate(['/dashboard/info']);
  }


  addVideoToList(id: number) {
    this.dataService.addToWatchlist(id);
  }


  removeVideoFromList(id: number) {
    this.dataService.removeFromWatchlist(id);
  }
}
