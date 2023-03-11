import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProjectDetailsComponent } from './shared-project-details.component';

describe('SharedProjectDetailsComponent', () => {
  let component: SharedProjectDetailsComponent;
  let fixture: ComponentFixture<SharedProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
