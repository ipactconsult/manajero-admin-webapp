import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedCategoriesListComponent } from './archived-categories-list.component';

describe('ArchivedCategoriesListComponent', () => {
  let component: ArchivedCategoriesListComponent;
  let fixture: ComponentFixture<ArchivedCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedCategoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
