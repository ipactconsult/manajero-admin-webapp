import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvrementRapportComponent } from './recouvrement-rapport.component';

describe('RecouvrementRapportComponent', () => {
  let component: RecouvrementRapportComponent;
  let fixture: ComponentFixture<RecouvrementRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecouvrementRapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecouvrementRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
