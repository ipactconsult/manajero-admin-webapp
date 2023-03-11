import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalRequestDetailsComponent } from './rental-request-details.component';

describe('RentalRequestDetailsComponent', () => {
  let component: RentalRequestDetailsComponent;
  let fixture: ComponentFixture<RentalRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalRequestDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
