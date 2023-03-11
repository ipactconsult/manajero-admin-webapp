import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPrsListComponent } from './archived-prs-list.component';

describe('ArchivedPrsListComponent', () => {
  let component: ArchivedPrsListComponent;
  let fixture: ComponentFixture<ArchivedPrsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPrsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPrsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
