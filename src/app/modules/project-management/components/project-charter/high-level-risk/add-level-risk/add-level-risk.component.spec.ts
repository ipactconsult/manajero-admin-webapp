import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelRiskComponent } from './add-level-risk.component';

describe('AddLevelRiskComponent', () => {
  let component: AddLevelRiskComponent;
  let fixture: ComponentFixture<AddLevelRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevelRiskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLevelRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
