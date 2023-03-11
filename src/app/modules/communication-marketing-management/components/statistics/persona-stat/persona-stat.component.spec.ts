import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaStatComponent } from './persona-stat.component';

describe('PersonaStatComponent', () => {
  let component: PersonaStatComponent;
  let fixture: ComponentFixture<PersonaStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
