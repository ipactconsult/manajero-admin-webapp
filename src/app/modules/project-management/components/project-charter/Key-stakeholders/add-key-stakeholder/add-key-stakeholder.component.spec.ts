import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeyStakeholderComponent } from './add-key-stakeholder.component';

describe('AddKeyStakeholderComponent', () => {
  let component: AddKeyStakeholderComponent;
  let fixture: ComponentFixture<AddKeyStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKeyStakeholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKeyStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
