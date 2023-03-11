import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePromiseComponent } from './historique-promise.component';

describe('HistoriquePromiseComponent', () => {
  let component: HistoriquePromiseComponent;
  let fixture: ComponentFixture<HistoriquePromiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquePromiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquePromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
