import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivityResourceComponent } from './ativity-resource.component';

describe('AtivityResourceComponent', () => {
  let component: AtivityResourceComponent;
  let fixture: ComponentFixture<AtivityResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivityResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivityResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
