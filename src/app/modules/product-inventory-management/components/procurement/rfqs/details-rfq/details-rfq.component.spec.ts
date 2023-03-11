import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRfqComponent } from './details-rfq.component';

describe('DetailsRfqComponent', () => {
  let component: DetailsRfqComponent;
  let fixture: ComponentFixture<DetailsRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
