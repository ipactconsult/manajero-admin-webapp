import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRelanceComponent } from './details-relance.component';

describe('DetailsRelanceComponent', () => {
  let component: DetailsRelanceComponent;
  let fixture: ComponentFixture<DetailsRelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRelanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
