import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfcommentComponent } from './pdfcomment.component';

describe('PdfcommentComponent', () => {
  let component: PdfcommentComponent;
  let fixture: ComponentFixture<PdfcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfcommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
