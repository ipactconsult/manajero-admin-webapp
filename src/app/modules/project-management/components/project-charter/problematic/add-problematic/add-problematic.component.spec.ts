import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProblematicComponent } from './add-problematic.component';

describe('AddProblematicComponent', () => {
  let component: AddProblematicComponent;
  let fixture: ComponentFixture<AddProblematicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProblematicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProblematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
