import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganigramComponent } from './view-organigram.component';

describe('ViewOrganigramComponent', () => {
  let component: ViewOrganigramComponent;
  let fixture: ComponentFixture<ViewOrganigramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrganigramComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrganigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
