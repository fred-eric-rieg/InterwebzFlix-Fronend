import { Pipe, PipeTransform } from '@angular/core';

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
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  today = new Date();

  transform(videos: movies[] | null, ...args: string[]): movies[] | null {
    if (videos) {
      if ( args[0] === 'new') {
        return videos.filter((video) => {
          // If release date is not older that 1 week
          return new Date(video.release_date) > new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7);
        });
      } else if (args[0] === 'tutorial') {
        return videos.filter((video) => {
          // If genre is 1 (tutorial)
          return video.genres.includes(1);
        });
      } else if (args[0] === 'short') {
        return videos.filter((video) => {
          // If duration is less than 10 minutes
          return video.duration < 10;
        });
      }
    }
    
    return null;
  }

}
