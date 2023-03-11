import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGlobalCharterComponent } from './edit-global-charter.component';

describe('EditGlobalCharterComponent', () => {
  let component: EditGlobalCharterComponent;
  let fixture: ComponentFixture<EditGlobalCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGlobalCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGlobalCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
