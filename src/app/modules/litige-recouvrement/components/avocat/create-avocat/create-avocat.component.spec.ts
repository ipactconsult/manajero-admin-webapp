import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvocatComponent } from './create-avocat.component';

describe('CreateAvocatComponent', () => {
  let component: CreateAvocatComponent;
  let fixture: ComponentFixture<CreateAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAvocatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
