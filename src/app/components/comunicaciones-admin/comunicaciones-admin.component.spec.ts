import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacionesAdminComponent } from './comunicaciones-admin.component';

describe('ComunicacionesAdminComponent', () => {
  let component: ComunicacionesAdminComponent;
  let fixture: ComponentFixture<ComunicacionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComunicacionesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComunicacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
