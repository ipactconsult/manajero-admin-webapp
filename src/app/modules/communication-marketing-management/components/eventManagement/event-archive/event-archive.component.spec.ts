import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventArchiveComponent } from './event-archive.component';

describe('EventArchiveComponent', () => {
  let component: EventArchiveComponent;
  let fixture: ComponentFixture<EventArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
