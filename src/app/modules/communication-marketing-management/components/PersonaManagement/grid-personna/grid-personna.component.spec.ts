import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPersonnaComponent } from './grid-personna.component';

describe('GridPersonnaComponent', () => {
  let component: GridPersonnaComponent;
  let fixture: ComponentFixture<GridPersonnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridPersonnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPersonnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
