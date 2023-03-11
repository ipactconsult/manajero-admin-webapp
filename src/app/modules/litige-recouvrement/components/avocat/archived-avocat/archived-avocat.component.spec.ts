import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedAvocatComponent } from './archived-avocat.component';

describe('ArchivedAvocatComponent', () => {
  let component: ArchivedAvocatComponent;
  let fixture: ComponentFixture<ArchivedAvocatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedAvocatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedAvocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
