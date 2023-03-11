import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRfqsComponent } from './list-rfqs.component';

describe('ListRfqsComponent', () => {
  let component: ListRfqsComponent;
  let fixture: ComponentFixture<ListRfqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRfqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRfqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
