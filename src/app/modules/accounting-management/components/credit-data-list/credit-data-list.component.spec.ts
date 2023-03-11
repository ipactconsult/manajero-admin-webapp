import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDataListComponent } from './credit-data-list.component';

describe('CreditDataListComponent', () => {
  let component: CreditDataListComponent;
  let fixture: ComponentFixture<CreditDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
