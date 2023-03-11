import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecideVendorComponent } from './decide-vendor.component';

describe('DecideVendorComponent', () => {
  let component: DecideVendorComponent;
  let fixture: ComponentFixture<DecideVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecideVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecideVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
