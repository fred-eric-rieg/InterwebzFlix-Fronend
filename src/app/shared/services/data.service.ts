import { Injectable, OnDestroy } from '@angular/core';
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
export class DataService implements OnDestroy {

  environment = environment;

  private videoPool = new BehaviorSubject<movies[]>([]);
  // Expose the videos$ as Observable (read only stream)
  // which subscribes to updates that occur in the videoPool BehaviourSubject 
  public videos$ = this.videoPool.asObservable();

  private selectedVideo = new BehaviorSubject<movies | null>(null);
  public selectedVideo$ = this.selectedVideo.asObservable();

  private user = new BehaviorSubject<any | null>(null);
  public user$ = this.user.asObservable();

  private genres = new BehaviorSubject<any | null>(null);
  public genres$ = this.genres.asObservable();

  private actors = new BehaviorSubject<any | null>(null);
  public actors$ = this.actors.asObservable();

  private watchlist = new BehaviorSubject<any | null>(null);
  public watchlist$ = this.watchlist.asObservable();


  constructor(private http: HttpClient, private authService: AuthService) {
    console.log('data service constucted');
  }


  ngOnDestroy() {
    console.log('data service destroyed');
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
    const user = await lastValueFrom(this.http.get<any>(url, { headers }));
    this.user.next(user);
    console.log('user', user);
  }


  async updateUser(body: any) {
    const url = environment.baseUrl + 'user/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    const user = await lastValueFrom(this.http.put<any>(url, body, { headers }));
    this.user.next(user);
    console.log('user', user);
  }


  async updateUserPassword(body: any) {
    const url = environment.baseUrl + 'change-password/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    await lastValueFrom(this.http.post<any>(url, body, { headers }));
    console.log('password changed');
  }


  async getGenres() {
    const url = environment.baseUrl + 'genres/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    const genres = await lastValueFrom(this.http.get<any>(url, { headers }));
    this.genres.next(genres);
  }


  async getActors() {
    const url = environment.baseUrl + 'actors/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    const actors = await lastValueFrom(this.http.get<any>(url, { headers }));
    this.actors.next(actors);
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


  async getWatchlist() {
    const url = environment.baseUrl + 'watchlist/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    const watchlist = await lastValueFrom(this.http.get<any>(url, { headers }));
    this.watchlist.next(watchlist);
    console.log('watchlist', watchlist);
  }


  async addToWatchlist(videoId: number) {
    const url = environment.baseUrl + 'add-to-watchlist/' + videoId + '/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    await lastValueFrom(this.http.post<any>(url, {}, { headers }));
    console.log('added to watchlist');
    this.getWatchlist();
  }


  async removeFromWatchlist(videoId: number) {
    const url = environment.baseUrl + 'remove-from-watchlist/' + videoId + '/';
    const headers = {
      Authorization: 'Bearer ' + this.authService.getAccessToken()
    };
    await lastValueFrom(this.http.post<any>(url, {}, { headers }));
    console.log('removed from watchlist');
    this.getWatchlist();
  }
}
