import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFechaComponent } from './agregar-fecha.component';

describe('AgregarFechaComponent', () => {
  let component: AgregarFechaComponent;
  let fixture: ComponentFixture<AgregarFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarFechaComponent]
    });
    fixture = TestBed.createComponent(AgregarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
