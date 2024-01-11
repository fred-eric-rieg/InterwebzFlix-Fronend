import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

// Language 1 = English, 2 = Deutsch, 3 = Türkçe

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


@Injectable({
  providedIn: 'root'
})
export class DataService {

  environment = environment;

  private videoPool = new BehaviorSubject<movies[]>([]);
  // Expose the videos$ as Observable (read only stream)
  // which subscribes to updates that occur in the videoPool BehaviourSubject 
  public videos$ = this.videoPool.asObservable();

  private selectedVideo = new BehaviorSubject<movies | null>(null);
  // Expose the selectedVideo$ as Observable (read only stream)
  // which subscribes to updates that occur in the selectedVideo BehaviourSubject
  public selectedVideo$ = this.selectedVideo.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('data service constucted');
    this.getVideos();
  }

  /**
   * Makes request to the backend to get the video objects.
   * @returns videos from the backend.
   */
  async getVideos() {
    const url = environment.baseUrl + 'videos/';
    const headers = {
        Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    const videos = await lastValueFrom(this.http.get<any>(url, { headers }));
    this.videoPool.next(videos.results);
  }

  /**
   * Updates a single video in both the videoPool and selectedVideo BehaviourSubjects.
   * Important for updating the rating of a video.
   * @param id of the video to get from the backend.
   */
  async getVideo(id: number) {
    const url = environment.baseUrl + 'videos/' + id + '/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    const newVideo = await lastValueFrom(this.http.get<any>(url, { headers }));

    this.selectedVideo.next(newVideo);
    const currentVideos = this.videoPool.getValue();
    const updatedVideos = currentVideos.map(old => old.id === id ? {...newVideo} : old);
    this.videoPool.next(updatedVideos);
  }


  /**
   * Makes a get request to the backend to get the user object.
   * @returns the user object from the backend.
   */
  async getUser() {
    const url = environment.baseUrl + 'user/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    return lastValueFrom(this.http.get<any>(url, { headers }));
  }


  async getGenres() {
    const url = environment.baseUrl + 'genres/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    return lastValueFrom(this.http.get<any>(url, { headers }));
  }


  async getActors() {
    const url = environment.baseUrl + 'actors/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    return lastValueFrom(this.http.get<any>(url, { headers }));
  }


  async submitRating(rating: number) {
    const url = environment.baseUrl + 'ratings/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    const body = {
      video: this.selectedVideo.value?.id,
      rating: rating
    };
    return lastValueFrom(this.http.post<any>(url, body, { headers }));
  }


  setSelectedVideo(video: movies) {
    this.selectedVideo.next(video);
  }

}
