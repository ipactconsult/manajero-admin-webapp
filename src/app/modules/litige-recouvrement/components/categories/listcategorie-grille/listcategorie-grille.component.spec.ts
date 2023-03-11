import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcategorieGrilleComponent } from './listcategorie-grille.component';

describe('ListcategorieGrilleComponent', () => {
  let component: ListcategorieGrilleComponent;
  let fixture: ComponentFixture<ListcategorieGrilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcategorieGrilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcategorieGrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
