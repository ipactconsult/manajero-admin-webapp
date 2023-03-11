import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationHelperComponent } from './reconciliation-helper.component';

describe('ReconciliationHelperComponent', () => {
  let component: ReconciliationHelperComponent;
  let fixture: ComponentFixture<ReconciliationHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
