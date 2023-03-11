import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCallComponent } from './historique-call.component';

describe('HistoriqueCallComponent', () => {
  let component: HistoriqueCallComponent;
  let fixture: ComponentFixture<HistoriqueCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
