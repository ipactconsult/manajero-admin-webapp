import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesStatusComponent } from './activities-status.component';

describe('ActivitiesStatusComponent', () => {
  let component: ActivitiesStatusComponent;
  let fixture: ComponentFixture<ActivitiesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
