import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSuivantComponent } from './date-suivant.component';

describe('DateSuivantComponent', () => {
  let component: DateSuivantComponent;
  let fixture: ComponentFixture<DateSuivantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSuivantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSuivantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
