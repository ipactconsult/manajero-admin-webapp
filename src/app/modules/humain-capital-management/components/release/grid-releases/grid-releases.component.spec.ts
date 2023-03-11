import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReleasesComponent } from './grid-releases.component';

describe('GridReleasesComponent', () => {
  let component: GridReleasesComponent;
  let fixture: ComponentFixture<GridReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridReleasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
