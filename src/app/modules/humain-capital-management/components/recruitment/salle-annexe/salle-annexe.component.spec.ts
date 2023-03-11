import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalleAnnexeComponent } from './salle-annexe.component';

describe('SalleAnnexeComponent', () => {
  let component: SalleAnnexeComponent;
  let fixture: ComponentFixture<SalleAnnexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalleAnnexeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalleAnnexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
