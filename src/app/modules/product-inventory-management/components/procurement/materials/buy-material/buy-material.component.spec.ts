import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMaterialComponent } from './buy-material.component';

describe('BuyMaterialComponent', () => {
  let component: BuyMaterialComponent;
  let fixture: ComponentFixture<BuyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
