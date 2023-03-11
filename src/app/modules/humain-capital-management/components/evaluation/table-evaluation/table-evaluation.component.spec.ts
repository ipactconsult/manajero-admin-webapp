import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEvaluationComponent } from './table-evaluation.component';

describe('TableEvaluationComponent', () => {
  let component: TableEvaluationComponent;
  let fixture: ComponentFixture<TableEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
