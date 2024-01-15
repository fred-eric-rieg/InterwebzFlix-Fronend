import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { provideHttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, RouterTestingModule.withRoutes([{ path: 'landingpage', component: LandingpageComponent}]), LoginComponent],
      declarations: [],
      providers: [provideHttpClient()]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to landing page', () => {
    spyOn(component.router, 'navigate');
    component.goToLandingPage();
    expect(component.router.navigate).toHaveBeenCalledWith(['/landingpage']);
  });

  it('should call login method with valid form', () => {
    spyOn(component, 'login');
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.postIfValid();
    expect(component.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should show error message for invalid form', () => {
    spyOn(component, 'showErrorMessage');
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.postIfValid();
    expect(component.showErrorMessage).toHaveBeenCalled();
  });

  it('should call auth service login method', async () => {
    spyOn(component.auth, 'loginWithEmailAndPassword').and.returnValue(Promise.resolve({ access: 'token', refresh: 'refreshToken' }));
    spyOn(component.auth, 'setAccessToken');
    spyOn(component.auth, 'setRefreshToken');
    spyOn(component.router, 'navigate');
    await component.login('test@example.com', 'password123');
    expect(component.auth.loginWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(component.auth.setAccessToken).toHaveBeenCalledWith('token');
    expect(component.auth.setRefreshToken).toHaveBeenCalledWith('refreshToken');
    expect(component.router.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('should show password', () => {
    spyOn(component.renderer, 'setAttribute');
    component.isShowing = false;
    component.showPassword();
    expect(component.isShowing).toBe(true);
    expect(component.renderer.setAttribute).toHaveBeenCalledWith(component.passwordElement.nativeElement, 'type', 'text');
  });

  it('should hide password', () => {
    spyOn(component.renderer, 'setAttribute');
    component.isShowing = true;
    component.showPassword();
    expect(component.isShowing).toBe(false);
    expect(component.renderer.setAttribute).toHaveBeenCalledWith(component.passwordElement.nativeElement, 'type', 'password');
  });

  it('should show error message', () => {
    spyOn(component.renderer, 'createElement').and.returnValue(document.createElement('div'));
    spyOn(component.renderer, 'setProperty');
    spyOn(component.renderer, 'addClass');
    spyOn(component.renderer, 'appendChild');
    spyOn(component.renderer, 'removeChild');
    component.showErrorMessage('Please check your input!');
    expect(component.renderer.createElement).toHaveBeenCalledWith('div');
    expect(component.renderer.setProperty).toHaveBeenCalledWith(jasmine.any(HTMLDivElement), 'innerText', 'Please check your input!');
    expect(component.renderer.addClass).toHaveBeenCalledWith(jasmine.any(HTMLDivElement), 'warning');
    expect(component.renderer.appendChild).toHaveBeenCalledWith(component.bg.nativeElement, jasmine.any(HTMLDivElement));
    setTimeout(() => {
      expect(component.renderer.addClass).toHaveBeenCalledWith(jasmine.any(HTMLDivElement), 'down');
    }, 2000);
    setTimeout(() => {
      expect(component.renderer.removeChild).toHaveBeenCalledWith(component.bg.nativeElement, jasmine.any(HTMLDivElement));
    }, 4000);
  });
});