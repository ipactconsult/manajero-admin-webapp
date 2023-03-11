import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSalesProcessComponent } from './products-sales-process.component';

describe('ProductsSalesProcessComponent', () => {
  let component: ProductsSalesProcessComponent;
  let fixture: ComponentFixture<ProductsSalesProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSalesProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSalesProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
