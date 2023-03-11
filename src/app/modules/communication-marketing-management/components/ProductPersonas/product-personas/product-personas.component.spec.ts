import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPersonasComponent } from './product-personas.component';

describe('ProductPersonasComponent', () => {
  let component: ProductPersonasComponent;
  let fixture: ComponentFixture<ProductPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
