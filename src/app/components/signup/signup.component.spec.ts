import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: { email: 'test@mail.com' } }
          }
        },
        provideHttpClient()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set email from query params', () => {
    spyOn(component.emailElement.nativeElement, 'value');
    spyOn(component.registration.controls['email'], 'setValue');
    component.ngOnInit();
    component.ngAfterViewInit();
    expect(component.emailElement.nativeElement.value).toHaveBeenCalledWith(component.route.snapshot.queryParams['email']);
    expect(component.registration.controls['email'].setValue).toHaveBeenCalledWith(component.route.snapshot.queryParams['email']);
  });
});
