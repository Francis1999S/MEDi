import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDestinacionComponent } from './crear-destinacion.component';

describe('CrearDestinacionComponent', () => {
  let component: CrearDestinacionComponent;
  let fixture: ComponentFixture<CrearDestinacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearDestinacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearDestinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
