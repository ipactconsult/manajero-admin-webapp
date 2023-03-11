import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReleasesComponent } from './table-releases.component';

describe('TableReleasesComponent', () => {
  let component: TableReleasesComponent;
  let fixture: ComponentFixture<TableReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableReleasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
