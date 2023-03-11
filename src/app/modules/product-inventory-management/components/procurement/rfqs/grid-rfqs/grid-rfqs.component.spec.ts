import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRfqsComponent } from './grid-rfqs.component';

describe('GridRfqsComponent', () => {
  let component: GridRfqsComponent;
  let fixture: ComponentFixture<GridRfqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridRfqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRfqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
