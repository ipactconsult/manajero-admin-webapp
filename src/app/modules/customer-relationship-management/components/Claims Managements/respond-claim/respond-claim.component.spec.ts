import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondClaimComponent } from './respond-claim.component';

describe('RespondClaimComponent', () => {
  let component: RespondClaimComponent;
  let fixture: ComponentFixture<RespondClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
