import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPoComponent } from './show-po.component';

describe('ShowPoComponent', () => {
  let component: ShowPoComponent;
  let fixture: ComponentFixture<ShowPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
