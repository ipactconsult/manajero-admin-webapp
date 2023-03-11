import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDirectionForForecastComponent } from './select-direction-for-forecast.component';

describe('SelectDirectionForForecastComponent', () => {
  let component: SelectDirectionForForecastComponent;
  let fixture: ComponentFixture<SelectDirectionForForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDirectionForForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDirectionForForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
