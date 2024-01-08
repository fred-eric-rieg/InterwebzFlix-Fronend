import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonPrimaryDirective } from '../../shared/directives/button-primary.directive';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, ButtonPrimaryDirective],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {

  @ViewChild('emailInput') emailElement: ElementRef;


  constructor(private router: Router, private renderer: Renderer2) {
    this.emailElement = new ElementRef('');
  }


  ngOnInit() {
    this.router.navigate(['/dashboard']);
  }


  gotToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Validates the email input and redirects to the register page if the email is valid.
   */
  redirectIfValid() {
    if (!this.isValid()) {
      this.emailElement.nativeElement.focus();
      this.emailElement.nativeElement.select();
      let value = this.emailElement.nativeElement.value;
      this.emailElement.nativeElement.value = '';
      this.renderer.setAttribute(this.emailElement?.nativeElement, 'placeholder', 'Please enter a valid email address');
      setTimeout(() => {
        this.emailElement.nativeElement.value = value;
      }, 2000);
    } else {
      // Redirect to register page with email as query parameter
      this.router.navigate(['/signup'], { queryParams: { email: this.emailElement.nativeElement.value } });
    }
  }


  /**
   * Simple email validation with regular expression.
   * @returns true if the email is valid, false otherwise
   */
  isValid() {
    if (this.emailElement.nativeElement.value.length === 0) return false;
    // Regular expression for email validation
    else if (!this.emailElement.nativeElement.value.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')) return false;
    else return true;
  }
}
