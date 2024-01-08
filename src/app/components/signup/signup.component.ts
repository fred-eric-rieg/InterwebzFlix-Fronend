import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryDirective, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, AfterViewInit {

  @ViewChild('emailInput') emailElement: ElementRef;
  @ViewChild('passwordInput1') passwordElement: ElementRef;
  @ViewChild('passwordInput2') passwordElement2: ElementRef;
  @ViewChild('submit') submitButton: ElementRef;

  //This reference is used to display an animation while the registration is being processed.
  @ViewChild('loading') loading: ElementRef | undefined;

  registration: FormGroup;

  email: string = '';
  password: string = '';
  password2: string = '';


  constructor(private route: ActivatedRoute, private router: Router, private renderer: Renderer2, private auth: AuthService) {
    this.emailElement = new ElementRef('');
    this.passwordElement = new ElementRef('');
    this.passwordElement2 = new ElementRef('');
    this.submitButton = new ElementRef('');
    this.registration = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }


  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }


  ngAfterViewInit() {
    this.emailElement.nativeElement.value = this.route.snapshot.queryParams['email'];
    this.registration.controls['email'].setValue(this.route.snapshot.queryParams['email']);
    this.renderer.setAttribute(this.passwordElement?.nativeElement, 'placeholder', 'Please enter a password');
    this.renderer.setAttribute(this.passwordElement2?.nativeElement, 'placeholder', 'Please repeat the password');
  }


  goToLandingPage() {
    this.router.navigate(['/landingpage']);
  }


  async postIfValid() {
    if (this.registration.valid) {
      this.sealRegistration();
      this.showLoading();
      try {
        let response = await this.auth.register(this.registration.controls['email'].value, this.registration.controls['password'].value, this.registration.controls['password2'].value);
        response.success ? this.successfulRegistration() : this.invalidRegistration();
      } catch (error) {
        console.log(error);
        this.invalidRegistration();
      }
    } 
  }

  /**
   * Disables the submit button and clears the input fields.
   */
  sealRegistration() {
    this.emailElement.nativeElement.value = '';
    this.passwordElement.nativeElement.value = '';
    this.passwordElement2.nativeElement.value = '';
    this.submitButton.nativeElement.setAttribute('disabled', 'true');
  }

  /**
   * Displays an animation to indicate that the registration is being processed.
   */
  showLoading() {
    let div = this.renderer.createElement('div');
    this.renderer.setProperty(div, 'innerText', 'Transmitting...');
    this.renderer.setAttribute(div, 'id', 'loading');
    this.loading = new ElementRef(div);
    this.renderer.addClass(div, 'loading');
    this.renderer.appendChild(document.body, div);
    this.renderer.addClass(div, 'moveIn');
  }

  /**
   * Resets the registration form and navigates to the login page.
   */
  successfulRegistration() {
    this.registration.reset();
    this.renderer.removeChild(document.body, this.loading?.nativeElement);
    this.router.navigate(['/login']);
  }

  /**
   * Removes the loading animation and enables the submit button.
   */
  invalidRegistration() {
    this.renderer.removeChild(document.body, this.loading?.nativeElement);
    this.submitButton.nativeElement.setAttribute('disabled', 'false');
  }
}
