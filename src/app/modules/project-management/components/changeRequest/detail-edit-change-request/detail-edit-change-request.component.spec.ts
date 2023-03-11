import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEditChangeRequestComponent } from './detail-edit-change-request.component';

describe('DetailEditChangeRequestComponent', () => {
  let component: DetailEditChangeRequestComponent;
  let fixture: ComponentFixture<DetailEditChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEditChangeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEditChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
