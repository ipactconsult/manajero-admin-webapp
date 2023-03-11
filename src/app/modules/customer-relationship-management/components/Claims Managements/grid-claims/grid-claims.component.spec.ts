import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridClaimsComponent } from './grid-claims.component';

describe('GridClaimsComponent', () => {
  let component: GridClaimsComponent;
  let fixture: ComponentFixture<GridClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
