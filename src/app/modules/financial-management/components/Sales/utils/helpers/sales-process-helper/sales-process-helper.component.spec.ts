import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProcessHelperComponent } from './sales-process-helper.component';

describe('SalesProcessHelperComponent', () => {
  let component: SalesProcessHelperComponent;
  let fixture: ComponentFixture<SalesProcessHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesProcessHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProcessHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
