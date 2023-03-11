import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGraphicalCharterComponent } from './edit-graphical-charter.component';

describe('EditGraphicalCharterComponent', () => {
  let component: EditGraphicalCharterComponent;
  let fixture: ComponentFixture<EditGraphicalCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGraphicalCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGraphicalCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
