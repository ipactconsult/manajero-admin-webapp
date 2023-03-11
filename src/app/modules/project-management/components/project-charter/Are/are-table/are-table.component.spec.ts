import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreTableComponent } from './are-table.component';

describe('AreTableComponent', () => {
  let component: AreTableComponent;
  let fixture: ComponentFixture<AreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
