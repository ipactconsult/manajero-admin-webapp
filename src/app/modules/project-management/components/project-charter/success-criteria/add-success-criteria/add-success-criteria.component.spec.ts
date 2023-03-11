import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuccessCriteriaComponent } from './add-success-criteria.component';

describe('AddSuccessCriteriaComponent', () => {
  let component: AddSuccessCriteriaComponent;
  let fixture: ComponentFixture<AddSuccessCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuccessCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuccessCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
