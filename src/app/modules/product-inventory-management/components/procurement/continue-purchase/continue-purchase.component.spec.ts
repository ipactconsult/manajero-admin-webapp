import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuePurchaseComponent } from './continue-purchase.component';

describe('ContinuePurchaseComponent', () => {
  let component: ContinuePurchaseComponent;
  let fixture: ComponentFixture<ContinuePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuePurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinuePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
