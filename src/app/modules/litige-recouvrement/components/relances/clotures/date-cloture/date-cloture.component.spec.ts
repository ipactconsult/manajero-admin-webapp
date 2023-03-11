import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateClotureComponent } from './date-cloture.component';

describe('DateClotureComponent', () => {
  let component: DateClotureComponent;
  let fixture: ComponentFixture<DateClotureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateClotureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateClotureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
