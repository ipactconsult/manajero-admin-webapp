import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceivedMaterialsComponent } from './list-received-materials.component';

describe('ListReceivedMaterialsComponent', () => {
  let component: ListReceivedMaterialsComponent;
  let fixture: ComponentFixture<ListReceivedMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReceivedMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceivedMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
