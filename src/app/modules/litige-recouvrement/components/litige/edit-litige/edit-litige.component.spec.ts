import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLitigeComponent } from './edit-litige.component';

describe('EditLitigeComponent', () => {
  let component: EditLitigeComponent;
  let fixture: ComponentFixture<EditLitigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLitigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLitigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
