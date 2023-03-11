import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedJournalListComponent } from './archived-journal-list.component';

describe('ArchivedJournalListComponent', () => {
  let component: ArchivedJournalListComponent;
  let fixture: ComponentFixture<ArchivedJournalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedJournalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedJournalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
