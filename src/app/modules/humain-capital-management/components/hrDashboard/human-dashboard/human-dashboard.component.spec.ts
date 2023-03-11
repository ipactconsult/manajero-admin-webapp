import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanDashboardComponent } from './human-dashboard.component';

describe('HumanDashboardComponent', () => {
  let component: HumanDashboardComponent;
  let fixture: ComponentFixture<HumanDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumanDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
