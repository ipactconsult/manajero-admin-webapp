import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedRfqsListComponent } from './archived-rfqs-list.component';

describe('ArchivedRfqsListComponent', () => {
  let component: ArchivedRfqsListComponent;
  let fixture: ComponentFixture<ArchivedRfqsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedRfqsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedRfqsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
