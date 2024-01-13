import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-askreset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonPrimaryDirective],
  templateUrl: './askreset.component.html',
  styleUrl: './askreset.component.scss'
})
export class AskresetComponent {

  @ViewChild('emailInput') emailElement: ElementRef;
  @ViewChild('submit') submitButton: ElementRef;
  @ViewChild('bg') bg: ElementRef;


  resetForm: FormGroup;


  constructor(private router: Router, private renderer: Renderer2, private authService: AuthService) {
    this.emailElement = new ElementRef('');
    this.submitButton = new ElementRef('');
    this.bg = new ElementRef('');

    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  goToLandingPage() {
    this.router.navigate(['/landingpage']);
  }


  /**
   * This method is called when the user clicks the submit button.
   * It checks if the form is valid and if so, it calls the login method.
   */
  async postIfValid() {
    if (this.resetForm.valid) {
      this.resetForm.controls['email'].value;
      let response = await this.authService.askForReset(this.resetForm.controls['email'].value);
      console.log(response);
      this.router.navigate(['/landingpage']);
    } else {
      this.showErrorMessage();
    }
  }


  showErrorMessage() {
    let el = this.renderer.createElement('div');
    this.renderer.setProperty(el, 'innerText', 'Please check your input!');
    this.renderer.addClass(el, 'warning')
    this.renderer.appendChild(this.bg?.nativeElement, el);
    setTimeout(() => {
      this.renderer.addClass(el, 'down');
    }, 2000);
    setTimeout(() => {
      this.renderer.removeChild(this.bg?.nativeElement, el);
    }, 4000);
  }
}
