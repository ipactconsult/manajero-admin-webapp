import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfsmsComponent } from './pdfsms.component';

describe('PdfsmsComponent', () => {
  let component: PdfsmsComponent;
  let fixture: ComponentFixture<PdfsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfsmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
