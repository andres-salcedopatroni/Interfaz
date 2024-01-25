import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarEstudianteComponent } from './ingresar-estudiante.component';

describe('IngresarEstudianteComponent', () => {
  let component: IngresarEstudianteComponent;
  let fixture: ComponentFixture<IngresarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
