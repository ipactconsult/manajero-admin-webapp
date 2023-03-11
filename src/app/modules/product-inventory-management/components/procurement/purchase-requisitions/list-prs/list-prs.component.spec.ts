import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrsComponent } from './list-prs.component';

describe('ListPrsComponent', () => {
  let component: ListPrsComponent;
  let fixture: ComponentFixture<ListPrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
