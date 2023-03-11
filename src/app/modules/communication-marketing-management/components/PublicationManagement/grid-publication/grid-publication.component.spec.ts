import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPublicationComponent } from './grid-publication.component';

describe('GridPublicationComponent', () => {
  let component: GridPublicationComponent;
  let fixture: ComponentFixture<GridPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridPublicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
