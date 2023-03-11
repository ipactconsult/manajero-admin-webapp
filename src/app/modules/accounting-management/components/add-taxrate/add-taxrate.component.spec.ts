import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxrateComponent } from './add-taxrate.component';

describe('AddTaxrateComponent', () => {
  let component: AddTaxrateComponent;
  let fixture: ComponentFixture<AddTaxrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
