import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenApplicationComponent } from './screen-application.component';

describe('ScreenApplicationComponent', () => {
  let component: ScreenApplicationComponent;
  let fixture: ComponentFixture<ScreenApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
