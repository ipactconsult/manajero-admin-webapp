import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTypeComponent } from './type-type.component';

describe('TypeTypeComponent', () => {
  let component: TypeTypeComponent;
  let fixture: ComponentFixture<TypeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
