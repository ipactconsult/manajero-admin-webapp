import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductPersonasComponent } from './edit-product-personas.component';

describe('EditProductPersonasComponent', () => {
  let component: EditProductPersonasComponent;
  let fixture: ComponentFixture<EditProductPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductPersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
