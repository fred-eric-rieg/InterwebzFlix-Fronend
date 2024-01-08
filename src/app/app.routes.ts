import { Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

export const routes: Routes = [
    { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
    { path: '', component: LandingpageComponent },
];
