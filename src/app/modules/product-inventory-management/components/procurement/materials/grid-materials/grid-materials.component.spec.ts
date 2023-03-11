import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMaterialsComponent } from './grid-materials.component';

describe('GridMaterialsComponent', () => {
  let component: GridMaterialsComponent;
  let fixture: ComponentFixture<GridMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
