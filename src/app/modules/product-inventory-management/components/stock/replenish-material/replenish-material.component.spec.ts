import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishMaterialComponent } from './replenish-material.component';

describe('ReplenishMaterialComponent', () => {
  let component: ReplenishMaterialComponent;
  let fixture: ComponentFixture<ReplenishMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplenishMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
