import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquePartnerComponent } from './statistique-partner.component';

describe('StatistiquePartnerComponent', () => {
  let component: StatistiquePartnerComponent;
  let fixture: ComponentFixture<StatistiquePartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquePartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
