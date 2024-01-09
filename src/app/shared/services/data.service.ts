import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface movies {
  title: string,
  description: string,
  thumbnail: string,
  video: string,
  imdb_rating: number,
  user_rating: number,
  views: number,
  video_quality: string,
  sound_quality: string,
  genres: number[],
  actors: number[],
  duration: number,
  season_number: number | null,
  episode_number: number | null,
  country_of_origin: string,
  age_rating: string,
  subtitles: object[],
  language: string,
  release_date: Date,
  created_at: Date,
  updated_at: Date,
  tags: object[]
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
        description: "This is a dummy video",
        thumbnail: "/assets/img/thumbnail.png",
        video: "/assets/videos/dummy-video.mp4",
        imdb_rating: 8.1,
        user_rating: 3.5,
        views: 215,
        video_quality: "HD",
        sound_quality: "2.1 Stereo",
        genres: [1],
        actors: [1],
        duration: 60,
        season_number: null,
        episode_number: null,
        country_of_origin: "Türkiye",
        age_rating: "PG 14",
        subtitles: [],
        language: "English",
        release_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        tags: []
      },
      {
        title: "Dummy Video 2",
        description: "This is a dummy video 2",
        thumbnail: "/assets/img/thumbnail.png",
        video: "/assets/videos/dummy-video.mp4",
        imdb_rating: 8.2,
        user_rating: 4.0,
        views: 654,
        video_quality: "UHD",
        sound_quality: "5.1 Dolby Digital",
        genres: [2],
        actors: [2],
        duration: 60,
        season_number: null,
        episode_number: null,
        country_of_origin: "Germany",
        age_rating: "PG 14",
        subtitles: [],
        language: "Deutsch",
        release_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        tags: []
      },
      {
        title: "Dummy Video 3",
        description: "This is a dummy video 3",
        thumbnail: "/assets/img/thumbnail.png",
        video: "/assets/videos/dummy-video.mp4",
        imdb_rating: 5.0,
        user_rating: 2.9,
        views: 1025,
        video_quality: "4K",
        sound_quality: "2.1 Stereo",
        genres: [3],
        actors: [3],
        duration: 160,
        season_number: null,
        episode_number: null,
        country_of_origin: "USA",
        age_rating: "PG 16",
        subtitles: [],
        language: "English",
        release_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        tags: []
      }
    ]);
    this.selectedVideo.next(this.dummyVideos.value[0]);
  }


}
