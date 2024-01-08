import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgVideoComponent } from './bg-video.component';

describe('BgVideoComponent', () => {
  let component: BgVideoComponent;
  let fixture: ComponentFixture<BgVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BgVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
