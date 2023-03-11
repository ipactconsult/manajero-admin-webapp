import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueSmsComponent } from './historique-sms.component';

describe('HistoriqueSmsComponent', () => {
  let component: HistoriqueSmsComponent;
  let fixture: ComponentFixture<HistoriqueSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
