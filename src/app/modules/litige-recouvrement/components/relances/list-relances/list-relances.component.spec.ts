import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRelancesComponent } from './list-relances.component';

describe('ListRelancesComponent', () => {
  let component: ListRelancesComponent;
  let fixture: ComponentFixture<ListRelancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRelancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRelancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
