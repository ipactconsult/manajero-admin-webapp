import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGlobalCharterComponent } from './add-global-charter.component';

describe('AddGlobalCharterComponent', () => {
  let component: AddGlobalCharterComponent;
  let fixture: ComponentFixture<AddGlobalCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGlobalCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGlobalCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
