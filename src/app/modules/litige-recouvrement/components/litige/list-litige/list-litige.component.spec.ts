import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLitigeComponent } from './list-litige.component';

describe('ListLitigeComponent', () => {
  let component: ListLitigeComponent;
  let fixture: ComponentFixture<ListLitigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLitigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLitigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
