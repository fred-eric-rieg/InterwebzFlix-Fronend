import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryDirective, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  @ViewChild('emailInput') emailElement: ElementRef;
  @ViewChild('passwordInput') passwordElement: ElementRef;
  @ViewChild('submit') submitButton: ElementRef;

  loginForm: FormGroup;

  email: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService) {
    this.emailElement = new ElementRef('');
    this.passwordElement = new ElementRef('');
    this.submitButton = new ElementRef('');
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async ngOnInit() {

  }

  goToLandingPage() {
    this.router.navigate(['/landingpage']);
  }

  /**
   * This method is called when the user clicks the submit button.
   * It checks if the form is valid and if so, it calls the login method.
   */
  async postIfValid() {
    console.log('Login form submitted');
    if (this.loginForm.valid) {
      this.email = this.loginForm.controls['email'].value;
      this.password = this.loginForm.controls['password'].value;
      this.login(this.email, this.password);
    }
  }


  async login(email: string, password: string) {
    try {
      let response = await this.auth.loginWithEmailAndPassword(email, password);
      if (response.access === undefined) {
        // TODO: show error message
        console.log('Login failed');
      } else {
        this.auth.setAccessToken(response.access);
        this.auth.setRefreshToken(response.refresh);
        console.log('Login successful');
        this.router.navigate(['/main']);
      }
    }
    catch (error) {
      // TODO: show error message
      console.error(error);
    }
  }


  


}
