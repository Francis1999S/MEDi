import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderphonesComponent } from './headerphones.component';

describe('HeaderphonesComponent', () => {
  let component: HeaderphonesComponent;
  let fixture: ComponentFixture<HeaderphonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderphonesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
