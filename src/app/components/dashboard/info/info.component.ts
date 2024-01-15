import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { GenrePipe } from "../../../shared/pipes/genre.pipe";
import { ActorPipe } from "../../../shared/pipes/actor.pipe";
import { LanguagePipe } from '../../../shared/pipes/language.pipe';
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
    selector: 'app-info',
    standalone: true,
    templateUrl: './info.component.html',
    styleUrl: './info.component.scss',
    imports: [ButtonSecondaryDirective, ButtonPrimaryDirective, CommonModule, GenrePipe, ActorPipe, LanguagePipe]
})
export class InfoComponent implements OnDestroy {
  watchlistSub: Subscription;
  watchlist: number[] = [];

  isRating: boolean = false;

  rating: number = 1;

  @ViewChild('onestar') onestar!: ElementRef;
  @ViewChild('twostar') twostar!: ElementRef;
  @ViewChild('threestar') threestar!: ElementRef;
  @ViewChild('fourstar') fourstar!: ElementRef;
  @ViewChild('fivestar') fivestar!: ElementRef;

  constructor(private router: Router, public dataService: DataService, private renderer: Renderer2) {
    this.onestar = new ElementRef('');
    this.twostar = new ElementRef('');
    this.threestar = new ElementRef('');
    this.fourstar = new ElementRef('');
    this.fivestar = new ElementRef('');

    this.watchlistSub = this.dataService.watchlist$.subscribe((watchlist) => {
      this.watchlist = watchlist.map((video: movies) => video.id);
    });
  }


  ngOnDestroy() {
    this.watchlistSub.unsubscribe();
  }


  playMovie() {
    this.router.navigate(['/dashboard/video']);
  }


  goToMain() {
    this.router.navigate(['/dashboard/main']);
  }


  toggleRating(event: any) {
    event.stopPropagation();
    this.isRating = !this.isRating;
  }


  rateMovie(event: any, rating: number) {
    event.stopPropagation();
    this.rating = rating;
  }


  // TODO: add error handling for trying to rate a movie again after already rating it
  // TODO: add option to change rating

  async sendRating(event: any) {
    event.stopPropagation();
    this.isRating = false;
    try {
      let resp = await this.dataService.submitRating(this.rating);
      await this.dataService.getVideo(resp.video);
    } catch (error) {
      this.showErrorMessage('You have already rated this movie.');
    } 
  }


  addVideoToList(id: number) {
    this.dataService.addToWatchlist(id);
  }


  removeVideoFromList(id: number) {
    this.dataService.removeFromWatchlist(id);
  }


  showErrorMessage(text: string) {
    let message = this.renderer.createElement('div');
    message.innerText = text;
    this.renderer.addClass(message, 'error-message');
    this.renderer.appendChild(document.body, message);
    setTimeout(() => {
      this.renderer.removeChild(document.body, message);
    }, 5000);
  }

}
