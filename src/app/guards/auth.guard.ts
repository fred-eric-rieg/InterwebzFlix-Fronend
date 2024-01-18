import { AuthService } from '../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      let response = await this.authService.validateToken();
      if (Object.keys(response).length == 0) {
        return true;
      }
    } catch (error) {
      this.router.navigate(['login']);
      return false;
    }
    this.router.navigate(['login']);
    return false;
  }
}

