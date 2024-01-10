import { Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { InfoComponent } from './components/dashboard/info/info.component';
import { VideoComponent } from './components/dashboard/video/video.component';

export const routes: Routes = [
    { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    { path: 'dashboard', component: DashboardComponent, children: [
        { path: '', redirectTo: 'main', pathMatch: 'full' },
        { path: 'main', component: MainComponent },
        { path: 'info', component: InfoComponent },
        { path: 'video', component: VideoComponent }
    ]},
    { path: '**', redirectTo: 'landingpage' }
];
