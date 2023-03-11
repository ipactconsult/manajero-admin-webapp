import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoiComponent } from './create-loi.component';

describe('CreateLoiComponent', () => {
  let component: CreateLoiComponent;
  let fixture: ComponentFixture<CreateLoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
