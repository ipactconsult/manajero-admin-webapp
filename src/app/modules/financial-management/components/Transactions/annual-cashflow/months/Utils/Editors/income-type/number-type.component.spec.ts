import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTypeComponent } from './number-type.component';

describe('NumberTypeComponent', () => {
  let component: NumberTypeComponent;
  let fixture: ComponentFixture<NumberTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
