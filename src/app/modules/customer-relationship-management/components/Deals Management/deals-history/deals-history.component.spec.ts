import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsHistoryComponent } from './deals-history.component';

describe('DealsHistoryComponent', () => {
  let component: DealsHistoryComponent;
  let fixture: ComponentFixture<DealsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
