import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCharterComponent } from './details-charter.component';

describe('DetailsCharterComponent', () => {
  let component: DetailsCharterComponent;
  let fixture: ComponentFixture<DetailsCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
