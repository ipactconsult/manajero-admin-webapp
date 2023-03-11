import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProjectComponent } from './shared-project.component';

describe('SharedProjectComponent', () => {
  let component: SharedProjectComponent;
  let fixture: ComponentFixture<SharedProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
