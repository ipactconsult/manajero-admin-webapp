import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectsHistoryComponent } from './prospects-history.component';

describe('ProspectsHistoryComponent', () => {
  let component: ProspectsHistoryComponent;
  let fixture: ComponentFixture<ProspectsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
