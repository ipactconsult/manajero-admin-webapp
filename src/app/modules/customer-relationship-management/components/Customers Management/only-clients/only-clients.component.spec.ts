import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyClientsComponent } from './only-clients.component';

describe('OnlyClientsComponent', () => {
  let component: OnlyClientsComponent;
  let fixture: ComponentFixture<OnlyClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
