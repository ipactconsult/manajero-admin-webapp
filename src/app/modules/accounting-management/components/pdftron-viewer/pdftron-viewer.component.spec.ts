import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdftronViewerComponent } from './pdftron-viewer.component';

describe('PdftronViewerComponent', () => {
  let component: PdftronViewerComponent;
  let fixture: ComponentFixture<PdftronViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdftronViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdftronViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
