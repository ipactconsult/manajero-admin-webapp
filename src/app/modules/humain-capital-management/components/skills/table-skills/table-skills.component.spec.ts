import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSkillsComponent } from './table-skills.component';

describe('TableSkillsComponent', () => {
  let component: TableSkillsComponent;
  let fixture: ComponentFixture<TableSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
