import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCriteriaTableComponent } from './success-criteria-table.component';

describe('SuccessCriteriaTableComponent', () => {
  let component: SuccessCriteriaTableComponent;
  let fixture: ComponentFixture<SuccessCriteriaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCriteriaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessCriteriaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
