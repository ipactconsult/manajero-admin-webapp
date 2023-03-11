import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueDepartmentsComponent } from './historique-departments.component';

describe('HistoriqueDepartmentsComponent', () => {
  let component: HistoriqueDepartmentsComponent;
  let fixture: ComponentFixture<HistoriqueDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueDepartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
