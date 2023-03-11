import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatGridComponent } from './avocat-grid.component';

describe('AvocatGridComponent', () => {
  let component: AvocatGridComponent;
  let fixture: ComponentFixture<AvocatGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvocatGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvocatGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
