import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasAdminComponent } from './areas-admin.component';

describe('AreasAdminComponent', () => {
  let component: AreasAdminComponent;
  let fixture: ComponentFixture<AreasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreasAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
