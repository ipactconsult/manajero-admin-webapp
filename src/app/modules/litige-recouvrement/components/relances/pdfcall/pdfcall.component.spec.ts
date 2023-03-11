import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfcallComponent } from './pdfcall.component';

describe('PdfcallComponent', () => {
  let component: PdfcallComponent;
  let fixture: ComponentFixture<PdfcallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfcallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
