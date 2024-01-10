import { AuthService } from '../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    console.log("%cAuthGuard checks canActivate", "color:orange");
    try {
      let response = await this.authService.validateToken();
      if (Object.keys(response).length == 0) {
        console.log("%cAuthGuard acces granted", "color:green");
        return true;
      }
    } catch (error) {
      console.log("%cAuthGuard error: access denied", "color:red");
      this.router.navigate(['login']);
      return false;
    }
    console.log("%cAuthGuard access denied", "color:red");
    this.router.navigate(['login']);
    return false;
  }
}

