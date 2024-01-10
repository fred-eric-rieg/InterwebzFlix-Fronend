import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Language 1 = English, 2 = Deutsch, 3 = Türkçe

interface movies {
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
  tags: string[]
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  dummyVideos = new BehaviorSubject<movies[]>([]);
  selectedVideo = new BehaviorSubject<movies | null>(null);

  constructor() {
    console.log('data service constucted');
    this.dummyVideos.next([
      {
        title: "Dummy Video",
        description_short: "This is a dummy video",
        description_long: "This is a dummy video with a longer description that might have up to 100 bytes of information.",
        thumbnail: "/assets/img/thumbnail.png",
        video: "/assets/videos/background.mp4",
        user_rating: 3.5,
        reviews: 215,
        video_quality: "HD",
        sound_quality: "2.1 Stereo",
        genres: [1],
        actors: [1],
        duration: 60,
        season_number: 0,
        episode_number: 0,
        country_of_origin: 101,
        age_rating: "PG 14",
        subtitles: [1, 2, 3],
        language: 1,
        release_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        tags: []
      },
      {
        title: "Dummy Video 2",
        description_short: "This is a dummy video 2",
        description_long: "This is a dummy video 2 with a longer description that might have up to 100 bytes of information.",
        thumbnail: "/assets/img/thumbnail.png",
        video: "/assets/videos/dummy-video.mp4",
        user_rating: 4.0,
        reviews: 654,
        video_quality: "UHD",
        sound_quality: "5.1 Dolby Digital",
        genres: [2],
        actors: [2],
        duration: 60,
        season_number: 1,
        episode_number: 1,
        country_of_origin: 102,
        age_rating: "PG 14",
        subtitles: [1, 2],
        language: 2,
        release_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        tags: []
      },
      {
        title: "Dummy Video 3",
        description_short: "This is a dummy video 3",
        description_long: "This is a dummy video 3 with a longer description that might have up to 100 bytes of information.",
        thumbnail: "/assets/img/thumbnail.png",
        video: "/assets/videos/dummy-video.mp4",
        user_rating: 2.9,
        reviews: 1025,
        video_quality: "4K",
        sound_quality: "2.1 Stereo",
        genres: [3],
        actors: [3],
        duration: 160,
        season_number: 0,
        episode_number: 0,
        country_of_origin: 101,
        age_rating: "PG 16",
        subtitles: [1],
        language: 1,
        release_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        tags: []
      }
    ]);
    console.log(this.dummyVideos.value);
    this.selectedVideo.next(this.dummyVideos.value[0]);
  }


}
