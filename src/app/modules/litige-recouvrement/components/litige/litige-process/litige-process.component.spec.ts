import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigeProcessComponent } from './litige-process.component';

describe('LitigeProcessComponent', () => {
  let component: LitigeProcessComponent;
  let fixture: ComponentFixture<LitigeProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitigeProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitigeProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
