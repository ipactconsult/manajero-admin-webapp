import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationArchiveComponent } from './publication-archive.component';

describe('PublicationArchiveComponent', () => {
  let component: PublicationArchiveComponent;
  let fixture: ComponentFixture<PublicationArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
