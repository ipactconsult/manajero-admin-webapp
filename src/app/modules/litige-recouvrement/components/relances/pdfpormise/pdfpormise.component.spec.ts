import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfpormiseComponent } from './pdfpormise.component';

describe('PdfpormiseComponent', () => {
  let component: PdfpormiseComponent;
  let fixture: ComponentFixture<PdfpormiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfpormiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfpormiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
