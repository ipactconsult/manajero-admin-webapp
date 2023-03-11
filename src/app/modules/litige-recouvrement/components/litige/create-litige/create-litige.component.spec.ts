import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLitigeComponent } from './create-litige.component';

describe('CreateLitigeComponent', () => {
  let component: CreateLitigeComponent;
  let fixture: ComponentFixture<CreateLitigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLitigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLitigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
