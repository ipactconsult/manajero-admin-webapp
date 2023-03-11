import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedTrainingComponent } from './recommended-training.component';

describe('RecommendedTrainingComponent', () => {
  let component: RecommendedTrainingComponent;
  let fixture: ComponentFixture<RecommendedTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
