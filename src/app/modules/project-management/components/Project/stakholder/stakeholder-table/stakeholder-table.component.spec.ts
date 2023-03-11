import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderTableComponent } from './stakeholder-table.component';

describe('StakeholderTableComponent', () => {
  let component: StakeholderTableComponent;
  let fixture: ComponentFixture<StakeholderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
