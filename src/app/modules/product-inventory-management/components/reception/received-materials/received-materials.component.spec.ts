import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedMaterialsComponent } from './received-materials.component';

describe('ReceivedMaterialsComponent', () => {
  let component: ReceivedMaterialsComponent;
  let fixture: ComponentFixture<ReceivedMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
