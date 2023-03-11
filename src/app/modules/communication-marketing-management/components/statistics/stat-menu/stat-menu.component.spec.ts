import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMenuComponent } from './stat-menu.component';

describe('StatMenuComponent', () => {
  let component: StatMenuComponent;
  let fixture: ComponentFixture<StatMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
