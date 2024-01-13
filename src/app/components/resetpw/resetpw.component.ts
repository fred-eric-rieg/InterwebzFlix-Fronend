import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-resetpw',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryDirective, ReactiveFormsModule],
  templateUrl: './resetpw.component.html',
  styleUrl: './resetpw.component.scss'
})
export class ResetpwComponent implements OnInit {

  isShowing: boolean = false;

  @ViewChild('passwordInput1') new_password1: ElementRef;
  @ViewChild('passwordInput2') new_password2: ElementRef;
  @ViewChild('submit') submitButton: ElementRef;

  //This reference is used to display an animation while the registration is being processed.
  @ViewChild('loading') loading: ElementRef | undefined;

  @ViewChild('bg') bg: ElementRef;

  reset: FormGroup;

  uidb64: string = '';
  token: string = '';


  constructor(private renderer: Renderer2, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.new_password1 = new ElementRef('');
    this.new_password2 = new ElementRef('');
    this.submitButton = new ElementRef('');
    this.reset = new FormGroup({
      new_password1: new FormControl('', [Validators.required, Validators.minLength(9)]),
      new_password2: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });
    this.bg = new ElementRef('');
  }

  ngOnInit() {
    // Get the uid and token from the url.
    this.route.queryParams.subscribe(params => {
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
      console.log(this.uidb64);
      console.log(this.token);
    });
  }


  goToLandingPage() {
    this.router.navigate(['/landingpage']);
  }


  togglePasswords() {
    this.isShowing = !this.isShowing;
    if (this.isShowing) {
      this.renderer.setAttribute(this.new_password1?.nativeElement, 'type', 'text');
      this.renderer.setAttribute(this.new_password2?.nativeElement, 'type', 'text');
    } else {
      this.renderer.setAttribute(this.new_password1?.nativeElement, 'type', 'password');
      this.renderer.setAttribute(this.new_password2?.nativeElement, 'type', 'password');
    }
  }


  async postIfValid() {
    if (this.isValidForm()) {
      console.log('valid form');
      let response = await this.authService.resetPassword(this.uidb64, this.token, this.reset.controls['new_password1'].value, this.reset.controls['new_password2'].value);
      console.log(response);
      // If the password was successfully reset, redirect to the login page.

    } else {
      console.log('invalid');
    }
  }

  /**
   * Checks if the built-in validators are valid and if the passwords match.
   * @returns true or false.
   */
  isValidForm() {
    return this.reset.valid && this.reset.controls['new_password1'].value === this.reset.controls['new_password2'].value;
  }

}
