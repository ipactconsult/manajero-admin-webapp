import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressRelanceComponent } from './progress-relance.component';

describe('ProgressRelanceComponent', () => {
  let component: ProgressRelanceComponent;
  let fixture: ComponentFixture<ProgressRelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressRelanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressRelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
