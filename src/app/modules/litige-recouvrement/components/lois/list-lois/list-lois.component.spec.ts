import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoisComponent } from './list-lois.component';

describe('ListLoisComponent', () => {
  let component: ListLoisComponent;
  let fixture: ComponentFixture<ListLoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
