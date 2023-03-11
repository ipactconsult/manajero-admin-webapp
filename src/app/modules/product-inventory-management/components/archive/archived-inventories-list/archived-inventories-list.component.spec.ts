import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedInventoriesListComponent } from './archived-inventories-list.component';

describe('ArchivedInventoriesListComponent', () => {
  let component: ArchivedInventoriesListComponent;
  let fixture: ComponentFixture<ArchivedInventoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedInventoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedInventoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
