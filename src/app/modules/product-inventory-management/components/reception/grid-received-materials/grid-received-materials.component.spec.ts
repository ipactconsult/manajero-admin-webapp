import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReceivedMaterialsComponent } from './grid-received-materials.component';

describe('GridReceivedMaterialsComponent', () => {
  let component: GridReceivedMaterialsComponent;
  let fixture: ComponentFixture<GridReceivedMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridReceivedMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReceivedMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
