import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaArchiveComponent } from './persona-archive.component';

describe('PersonaArchiveComponent', () => {
  let component: PersonaArchiveComponent;
  let fixture: ComponentFixture<PersonaArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
