import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatTableComponent } from './avocat-table.component';

describe('AvocatTableComponent', () => {
  let component: AvocatTableComponent;
  let fixture: ComponentFixture<AvocatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvocatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvocatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
