import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyStakeholdersTableComponent } from './key-stakeholders-table.component';

describe('KeyStakeholdersTableComponent', () => {
  let component: KeyStakeholdersTableComponent;
  let fixture: ComponentFixture<KeyStakeholdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyStakeholdersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyStakeholdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
