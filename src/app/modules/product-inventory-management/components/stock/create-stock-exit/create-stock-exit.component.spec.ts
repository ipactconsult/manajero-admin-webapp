import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockExitComponent } from './create-stock-exit.component';

describe('CreateStockExitComponent', () => {
  let component: CreateStockExitComponent;
  let fixture: ComponentFixture<CreateStockExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStockExitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
