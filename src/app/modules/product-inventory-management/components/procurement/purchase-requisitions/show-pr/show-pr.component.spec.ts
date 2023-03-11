import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPrComponent } from './show-pr.component';

describe('ShowPrComponent', () => {
  let component: ShowPrComponent;
  let fixture: ComponentFixture<ShowPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
