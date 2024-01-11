import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSecondaryDirective } from '../../../shared/directives/button-secondary.directive';
import { DataService } from '../../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryDirective } from '../../../shared/directives/button-primary.directive';
import { GenrePipe } from "../../../shared/pipes/genre.pipe";
import { ActorPipe } from "../../../shared/pipes/actor.pipe";
import { LanguagePipe } from '../../../shared/pipes/language.pipe';


@Component({
    selector: 'app-info',
    standalone: true,
    templateUrl: './info.component.html',
    styleUrl: './info.component.scss',
    imports: [ButtonSecondaryDirective, ButtonPrimaryDirective, CommonModule, GenrePipe, ActorPipe, LanguagePipe]
})
export class InfoComponent {

  isRating: boolean = false;

  rating: number = 1;

  @ViewChild('onestar') onestar!: ElementRef;
  @ViewChild('twostar') twostar!: ElementRef;
  @ViewChild('threestar') threestar!: ElementRef;
  @ViewChild('fourstar') fourstar!: ElementRef;
  @ViewChild('fivestar') fivestar!: ElementRef;

  constructor(private router: Router, public dataService: DataService) {
    this.onestar = new ElementRef('');
    this.twostar = new ElementRef('');
    this.threestar = new ElementRef('');
    this.fourstar = new ElementRef('');
    this.fivestar = new ElementRef('');
  }


  playMovie() {
    this.router.navigate(['/dashboard/video']);
  }


  goToMain() {
    this.router.navigate(['/dashboard/main']);
  }


  toggleRating(event: any) {
    event.stopPropagation();
    this.isRating = !this.isRating;
  }


  rateMovie(event: any, rating: number) {
    event.stopPropagation();
    this.rating = rating;
  }


  async sendRating(event: any) {
    event.stopPropagation();
    this.isRating = false;
    try {
      let resp = await this.dataService.submitRating(this.rating);
      await this.dataService.getVideo(resp.video);
    } catch (error) {
      console.log(error);
    } 
  }

}
