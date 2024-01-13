import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskresetComponent } from './askreset.component';

describe('AskresetComponent', () => {
  let component: AskresetComponent;
  let fixture: ComponentFixture<AskresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskresetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
