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
    this.deactivateSubmitButton();
    if (this.resetForm.valid) {
      this.resetForm.controls['email'].value;
      let response;
      try {
        response = await this.authService.askForReset(this.resetForm.controls['email'].value);
      } catch (error) {
        this.showInfoBox("Reset failed. Email invalid or does not exist.", "warning");
        this.activateSubmitButton(4000);
        return;
      }
      if (response.success) {
        this.showInfoBox("Reset successful. Check your email.", "success");
        setTimeout(() => {
          this.router.navigate(['/landingpage']);
        }, 4000);
      }
    } else {
      this.showInfoBox("Reset failed. Email invalid or does not exist.", "warning");
      this.activateSubmitButton(4000);
    }
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


  deactivateSubmitButton() {
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
