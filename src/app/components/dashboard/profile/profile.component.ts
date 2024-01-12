import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ButtonPrimaryDirective, ButtonSecondaryDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  userData: any;

  @ViewChild('submit') submitButton: ElementRef;
  @ViewChild('first') firstName: ElementRef;
  @ViewChild('last') lastName: ElementRef;
  @ViewChild('display') displayName: ElementRef;
  @ViewChild('birth') birthday: ElementRef;

  @ViewChild('submitEmail') submitEmailButton: ElementRef;
  @ViewChild('email') email: ElementRef;
  
  isEditing: boolean = false;
  isEditingEmail: boolean = false;

  emailForm: FormGroup;
  profileForm: FormGroup;

  constructor(private router: Router, public dataService: DataService, private renderer: Renderer2) {
    this.submitEmailButton = new ElementRef('');
    this.email = new ElementRef('');

    this.submitButton = new ElementRef('');
    this.firstName = new ElementRef('');
    this.lastName = new ElementRef('');
    this.displayName = new ElementRef('');
    this.birthday = new ElementRef('');

    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
    });

    this.profileForm = new FormGroup({
      first_name: new FormControl('', [Validators.maxLength(100)]),
      last_name: new FormControl('', [Validators.maxLength(100)]),
      display_name: new FormControl('', [Validators.maxLength(100)]),
      birthday: new FormControl('', [])
    });

    this.userSub = this.dataService.user$.subscribe(user => {
      this.userData = user;
    });
  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  goToMain() {
    this.router.navigate(['/dashboard/main']);
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }


  toggleEditEmail() {
    this.isEditingEmail = !this.isEditingEmail;
  }


  async postIfValid() {
    this.renderer.setAttribute(this.submitButton.nativeElement, 'disabled', 'true');
    this.isEditing = !this.isEditing;
    this.checkForChanges();
    if (this.profileForm.valid) {
      console.log("valid form", this.profileForm.value)
      //await this.dataService.updateUser(this.profileForm.value);
      //await this.dataService.getUser();
    } else {
      this.showErrorMessage('profile');
    }
    this.renderer.removeAttribute(this.submitButton.nativeElement, 'disabled');
  }


  async postEmailIfValid() {
    this.renderer.setAttribute(this.submitEmailButton.nativeElement, 'disabled', 'true');
    this.isEditingEmail = !this.isEditingEmail;
    this.checkForEmailChanges();
    if (this.emailForm.valid) {
      console.log("valid form", this.emailForm.value)
      //await this.dataService.updateUser(this.emailForm.value);
      //await this.dataService.getUser();
    } else {
      this.showErrorMessage('email');
    }
    this.renderer.removeAttribute(this.submitEmailButton.nativeElement, 'disabled');
  }


  showErrorMessage(where: string) {
    console.log("invalid form");
    where === 'profile' ? console.log(this.profileForm.value) : console.log(this.emailForm.value);
  }


  checkForChanges() {
    if (this.firstName.nativeElement.value != this.userData.first_name) {
      this.profileForm.controls['first_name'].setValue(this.firstName.nativeElement.value);
    }
    if (this.lastName.nativeElement.value != this.userData.last_name) {
      this.profileForm.controls['last_name'].setValue(this.lastName.nativeElement.value);
    }
    if (this.displayName.nativeElement.value != this.userData.display_name) {
      this.profileForm.controls['display_name'].setValue(this.displayName.nativeElement.value);
    }
    if (this.birthday.nativeElement.value != this.userData.date_of_birth) {
      this.profileForm.controls['birthday'].setValue(this.birthday.nativeElement.value);
    }
  }


  checkForEmailChanges() {
    if (this.email.nativeElement.value != this.userData.email) {
      this.emailForm.controls['email'].setValue(this.email.nativeElement.value);
    }
  }

}
