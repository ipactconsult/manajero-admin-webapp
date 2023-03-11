import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveGlobalCharterComponent } from './archive-global-charter.component';

describe('ArchiveGlobalCharterComponent', () => {
  let component: ArchiveGlobalCharterComponent;
  let fixture: ComponentFixture<ArchiveGlobalCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveGlobalCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveGlobalCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
