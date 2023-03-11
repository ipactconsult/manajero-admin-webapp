import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedMaterialsListComponent } from './archived-materials-list.component';

describe('ArchivedMaterialsListComponent', () => {
  let component: ArchivedMaterialsListComponent;
  let fixture: ComponentFixture<ArchivedMaterialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedMaterialsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedMaterialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
