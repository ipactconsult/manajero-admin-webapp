import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRfqComponent } from './show-rfq.component';

describe('ShowRfqComponent', () => {
  let component: ShowRfqComponent;
  let fixture: ComponentFixture<ShowRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
