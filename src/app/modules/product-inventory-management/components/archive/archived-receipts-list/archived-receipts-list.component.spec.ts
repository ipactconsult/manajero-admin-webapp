import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedReceiptsListComponent } from './archived-receipts-list.component';

describe('ArchivedReceiptsListComponent', () => {
  let component: ArchivedReceiptsListComponent;
  let fixture: ComponentFixture<ArchivedReceiptsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedReceiptsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedReceiptsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
