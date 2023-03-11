import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreComponent } from './add-are.component';

describe('AddAreComponent', () => {
  let component: AddAreComponent;
  let fixture: ComponentFixture<AddAreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
