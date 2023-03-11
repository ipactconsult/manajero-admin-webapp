import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerStatComponent } from './partner-stat.component';

describe('PartnerStatComponent', () => {
  let component: PartnerStatComponent;
  let fixture: ComponentFixture<PartnerStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
