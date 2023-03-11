import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedSuppliersListComponent } from './archived-suppliers-list.component';

describe('ArchivedSuppliersListComponent', () => {
  let component: ArchivedSuppliersListComponent;
  let fixture: ComponentFixture<ArchivedSuppliersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedSuppliersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedSuppliersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
