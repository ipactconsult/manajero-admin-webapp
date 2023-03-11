import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalRequestTableComponent } from './rental-request-table.component';

describe('RentalRequestTableComponent', () => {
  let component: RentalRequestTableComponent;
  let fixture: ComponentFixture<RentalRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalRequestTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
