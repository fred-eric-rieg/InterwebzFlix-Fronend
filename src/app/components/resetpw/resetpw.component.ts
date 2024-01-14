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
    this.route.params.subscribe(params => {
      this.uidb64 = params['uidb64'];
      this.token = params['token'];
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
    this.disableSubmitButton();
    if (this.isValidForm()) {
      let response;
      try {
        response = await this.authService.resetPassword(this.uidb64, this.token, this.reset.controls['new_password1'].value, this.reset.controls['new_password2'].value);
      } catch (error) {
        this.showInfoBox("Invalid or expired token.", "warning");
        this.activateSubmitButton(4000);
        return;
      }
      if (response.success) {
        this.showInfoBox("Reset successful. You can login now.", "success");
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);
        return;
      }
    } else {
      this.showInfoBox("Passwords invalid or do not match.", "warning");
      this.activateSubmitButton(4000);
    }
  }

  /**
   * Checks if the built-in validators are valid and if the passwords match.
   * @returns true or false.
   */
  isValidForm() {
    return this.reset.valid && this.reset.controls['new_password1'].value === this.reset.controls['new_password2'].value;
  }


  showInfoBox(message: string, type: string) {
    let el = this.renderer.createElement('div');
    this.renderer.setProperty(el, 'innerText', message);
    this.renderer.addClass(el, type)
    this.renderer.appendChild(this.bg?.nativeElement, el);
    setTimeout(() => {
      this.renderer.addClass(el, 'down');
    }, 2000);
    setTimeout(() => {
      this.renderer.removeChild(this.bg?.nativeElement, el);
    }, 4000);
  }


  disableSubmitButton() {
    this.renderer.setProperty(this.submitButton?.nativeElement, 'disabled', true);
  }

  /**
   * Reactivates the submitbutton after a given time.
   * @param time in ms
   */
  activateSubmitButton(time: number) {
    setTimeout(() => {
      this.renderer.setProperty(this.submitButton?.nativeElement, 'disabled', false);
    }, time);
  }

}
