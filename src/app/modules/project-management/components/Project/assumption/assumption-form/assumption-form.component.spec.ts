import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssumptionFormComponent } from './assumption-form.component';

describe('AssumptionFormComponent', () => {
  let component: AssumptionFormComponent;
  let fixture: ComponentFixture<AssumptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssumptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssumptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
