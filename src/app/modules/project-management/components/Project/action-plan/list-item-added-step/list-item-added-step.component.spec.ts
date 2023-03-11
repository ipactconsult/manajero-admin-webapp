import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemAddedStepComponent } from './list-item-added-step.component';

describe('ListItemAddedStepComponent', () => {
  let component: ListItemAddedStepComponent;
  let fixture: ComponentFixture<ListItemAddedStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemAddedStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemAddedStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
