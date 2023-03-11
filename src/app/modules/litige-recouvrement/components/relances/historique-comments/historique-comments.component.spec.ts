import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCommentsComponent } from './historique-comments.component';

describe('HistoriqueCommentsComponent', () => {
  let component: HistoriqueCommentsComponent;
  let fixture: ComponentFixture<HistoriqueCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
