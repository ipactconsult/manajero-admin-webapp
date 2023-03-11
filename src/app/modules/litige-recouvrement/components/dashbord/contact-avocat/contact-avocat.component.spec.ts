import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAvocatComponent } from './contact-avocat.component';

describe('ContactAvocatComponent', () => {
  let component: ContactAvocatComponent;
  let fixture: ComponentFixture<ContactAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactAvocatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
