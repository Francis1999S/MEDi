import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenAdminComponent } from './resumen-admin.component';

describe('ResumenAdminComponent', () => {
  let component: ResumenAdminComponent;
  let fixture: ComponentFixture<ResumenAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
