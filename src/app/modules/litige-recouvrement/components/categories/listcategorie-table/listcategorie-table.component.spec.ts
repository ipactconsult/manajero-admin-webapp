import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcategorieTableComponent } from './listcategorie-table.component';

describe('ListcategorieTableComponent', () => {
  let component: ListcategorieTableComponent;
  let fixture: ComponentFixture<ListcategorieTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcategorieTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcategorieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
