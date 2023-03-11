import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTableComponent } from './success-table.component';

describe('SuccessTableComponent', () => {
  let component: SuccessTableComponent;
  let fixture: ComponentFixture<SuccessTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
