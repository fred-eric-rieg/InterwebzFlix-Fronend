import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';
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

@Pipe({
  name: 'watchlist',
  pure: false,
  standalone: true
})
export class WatchlistPipe implements PipeTransform {

  sub: Subscription;
  watchlistIds: number[] = [];

  constructor(private dataService: DataService) {
    this.sub = this.dataService.watchlist$.subscribe((watchlist) => {
      if (watchlist) {
        this.watchlistIds = watchlist.map((video: movies) => video.id);
        console.log("watchlist sub triggered", this.watchlistIds);
      }
    });
  }

  transform(videos: movies[] | null): movies[] | null {
    if (videos) {
      return videos.filter(video => video.id === this.watchlistIds.find(id => id === video.id));
    }
    return null;
  }

}
