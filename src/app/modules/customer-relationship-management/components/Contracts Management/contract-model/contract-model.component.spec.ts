import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractModelComponent } from './contract-model.component';

describe('ContractModelComponent', () => {
  let component: ContractModelComponent;
  let fixture: ComponentFixture<ContractModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
