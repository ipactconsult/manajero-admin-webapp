import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQuotationsComponent } from './table-quotations.component';

describe('TableQuotationsComponent', () => {
  let component: TableQuotationsComponent;
  let fixture: ComponentFixture<TableQuotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableQuotationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
