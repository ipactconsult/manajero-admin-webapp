import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDealsComponent } from './grid-deals.component';

describe('GridDealsComponent', () => {
  let component: GridDealsComponent;
  let fixture: ComponentFixture<GridDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
