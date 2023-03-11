import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignContractComponent } from './assign-contract.component';

describe('AssignContractComponent', () => {
  let component: AssignContractComponent;
  let fixture: ComponentFixture<AssignContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
