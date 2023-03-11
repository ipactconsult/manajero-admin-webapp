import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceRequestTableComponent } from './resource-request-table.component';

describe('ResourceRequestTableComponent', () => {
  let component: ResourceRequestTableComponent;
  let fixture: ComponentFixture<ResourceRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceRequestTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
