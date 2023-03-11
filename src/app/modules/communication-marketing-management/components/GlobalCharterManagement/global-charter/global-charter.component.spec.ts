import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCharterComponent } from './global-charter.component';

describe('GlobalCharterComponent', () => {
  let component: GlobalCharterComponent;
  let fixture: ComponentFixture<GlobalCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
