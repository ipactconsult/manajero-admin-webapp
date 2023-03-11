import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvocatDetailsComponent } from './avocat-details.component';

describe('AvocatDetailsComponent', () => {
  let component: AvocatDetailsComponent;
  let fixture: ComponentFixture<AvocatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvocatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvocatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
