import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyFilterComponent } from './money-filter.component';

describe('MoneyFilterComponent', () => {
  let component: MoneyFilterComponent;
  let fixture: ComponentFixture<MoneyFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
