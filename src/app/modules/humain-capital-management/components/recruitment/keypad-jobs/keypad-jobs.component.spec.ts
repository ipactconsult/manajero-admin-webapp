import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadJobsComponent } from './keypad-jobs.component';

describe('KeypadJobsComponent', () => {
  let component: KeypadJobsComponent;
  let fixture: ComponentFixture<KeypadJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
