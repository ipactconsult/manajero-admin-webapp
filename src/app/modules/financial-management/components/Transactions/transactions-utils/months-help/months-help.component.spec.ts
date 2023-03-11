import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsHelpComponent } from './months-help.component';

describe('MonthsHelpComponent', () => {
  let component: MonthsHelpComponent;
  let fixture: ComponentFixture<MonthsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
