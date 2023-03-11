import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateloiComponent } from './updateloi.component';

describe('UpdateloiComponent', () => {
  let component: UpdateloiComponent;
  let fixture: ComponentFixture<UpdateloiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateloiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateloiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
