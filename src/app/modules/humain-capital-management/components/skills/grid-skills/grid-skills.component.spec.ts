import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSkillsComponent } from './grid-skills.component';

describe('GridSkillsComponent', () => {
  let component: GridSkillsComponent;
  let fixture: ComponentFixture<GridSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
