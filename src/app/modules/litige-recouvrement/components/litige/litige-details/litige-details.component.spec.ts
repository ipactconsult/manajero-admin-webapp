import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigeDetailsComponent } from './litige-details.component';

describe('LitigeDetailsComponent', () => {
  let component: LitigeDetailsComponent;
  let fixture: ComponentFixture<LitigeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitigeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitigeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
