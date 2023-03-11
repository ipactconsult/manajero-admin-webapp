import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadSkillsComponent } from './keypad-skills.component';

describe('KeypadSkillsComponent', () => {
  let component: KeypadSkillsComponent;
  let fixture: ComponentFixture<KeypadSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeypadSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
