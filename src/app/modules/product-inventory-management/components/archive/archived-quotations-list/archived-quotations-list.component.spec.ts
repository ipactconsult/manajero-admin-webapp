import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedQuotationsListComponent } from './archived-quotations-list.component';

describe('ArchivedQuotationsListComponent', () => {
  let component: ArchivedQuotationsListComponent;
  let fixture: ComponentFixture<ArchivedQuotationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedQuotationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedQuotationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
