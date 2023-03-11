import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRelanceComponent } from './create-relance.component';

describe('CreateRelanceComponent', () => {
  let component: CreateRelanceComponent;
  let fixture: ComponentFixture<CreateRelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRelanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
