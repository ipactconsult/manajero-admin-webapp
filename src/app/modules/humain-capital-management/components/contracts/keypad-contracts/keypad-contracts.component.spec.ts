import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadContractsComponent } from './keypad-contracts.component';

describe('KeypadContractsComponent', () => {
  let component: KeypadContractsComponent;
  let fixture: ComponentFixture<KeypadContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
