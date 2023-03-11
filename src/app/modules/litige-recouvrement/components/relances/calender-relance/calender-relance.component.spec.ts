import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderRelanceComponent } from './calender-relance.component';

describe('CalenderRelanceComponent', () => {
  let component: CalenderRelanceComponent;
  let fixture: ComponentFixture<CalenderRelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderRelanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderRelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
