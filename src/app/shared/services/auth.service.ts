import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private csrf_token: string = '';
  private access: string = '';
  private refresh: string = '';

  constructor(private http: HttpClient) {}


  getCsrfToken() {
    return this.csrf_token;
  }

  getAccessToken() {
    return this.access;
  }

  getRefreshToken() {
    return this.refresh;
  }

  setCsrfToken(token: string) {
    this.csrf_token = token;
  }

  setAccessToken(token: string) {
    this.access = token;
  }

  setRefreshToken(token: string) {
    this.refresh = token;
  }


  /**
   * Runs a login request to the backend to get a JWT token.
   * @param email as string
   * @param password as string
   * @returns an object with the access and refresh token.
   */
  async loginWithEmailAndPassword(email: string, password: string) {
    const url = environment.baseUrl + 'token/';
    const body = {
      email: email,
      password: password
    };
    return lastValueFrom(this.http.post<any>(url, body, { withCredentials: true }));
  }

  /**
   * Gets a new access token from the backend as long as the refresh Token is still valid.
   * @returns an object with only a new access token.
   */
  async refreshToken() {
    const url = environment.baseUrl + 'token/refresh/';
    const body = {
      refresh: this.getRefreshToken()
    };
    return lastValueFrom(this.http.post<any>(url, body, { withCredentials: true }));
  }

  /**
   * Validate the access token.
   * @returns nothing if the token is valid, otherwise an error.
   */
  async validateToken() {
    const url = environment.baseUrl + 'verify/';
    const body = {
      token: this.getAccessToken()
    };
    let response = await lastValueFrom(this.http.post<any>(url, body, { withCredentials: true }));
    return response;
  }


  async getCsrfTokenFromServer() {
    const url = environment.baseUrl + 'csrf/';
    return lastValueFrom(this.http.get<{ csrfToken: string }>(url));
  }

  /**
   * Makes a post request to the backend to register a new user.
   * @param email as string
   * @param password as string
   * @param password2 as string
   * @returns http response from the backend
   */
  async register(email: string, password: string, password2: string) {
    const url = environment.baseUrl + 'signup/';
    const body = {
      email: email,
      password1: password,
      password2: password2
    };
    return lastValueFrom(this.http.post<any>(url, body));
  }


  logout() {
    this.setCsrfToken('');
    this.setAccessToken('');
    this.setRefreshToken('');
  }


  async askForReset(email: string) {
    const url = environment.baseUrl + 'reset-password/';
    const body = {
      email: email
    };
    return lastValueFrom(this.http.post<any>(url, body));
  }


  async resetPassword(uidb64: string, token: string, new_password1: string, new_password2: string) {
    const url = environment.baseUrl + 'reset-password-confirm/' + uidb64 + '/' + token + '/';
    const body = {
      new_password1: new_password1,
      new_password2: new_password2
    };
    return lastValueFrom(this.http.post<any>(url, body));
  }
}
