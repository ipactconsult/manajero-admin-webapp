import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridQuotationsComponent } from './grid-quotations.component';

describe('GridQuotationsComponent', () => {
  let component: GridQuotationsComponent;
  let fixture: ComponentFixture<GridQuotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridQuotationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
