import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectCharterComponent } from './add-project-charter.component';

describe('AddProjectCharterComponent', () => {
  let component: AddProjectCharterComponent;
  let fixture: ComponentFixture<AddProjectCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
