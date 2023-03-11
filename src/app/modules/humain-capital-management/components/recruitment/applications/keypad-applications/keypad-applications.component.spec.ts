import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadApplicationsComponent } from './keypad-applications.component';

describe('KeypadApplicationsComponent', () => {
  let component: KeypadApplicationsComponent;
  let fixture: ComponentFixture<KeypadApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
