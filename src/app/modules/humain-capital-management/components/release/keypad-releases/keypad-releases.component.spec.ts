import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadReleasesComponent } from './keypad-releases.component';

describe('KeypadReleasesComponent', () => {
  let component: KeypadReleasesComponent;
  let fixture: ComponentFixture<KeypadReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadReleasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
