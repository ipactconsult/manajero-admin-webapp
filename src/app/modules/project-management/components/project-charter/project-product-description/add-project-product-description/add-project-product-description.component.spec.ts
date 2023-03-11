import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectProductDescriptionComponent } from './add-project-product-description.component';

describe('AddProjectProductDescriptionComponent', () => {
  let component: AddProjectProductDescriptionComponent;
  let fixture: ComponentFixture<AddProjectProductDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectProductDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectProductDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
