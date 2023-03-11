import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenraleInfoFormComponent } from './genrale-info-form.component';

describe('GenraleInfoFormComponent', () => {
  let component: GenraleInfoFormComponent;
  let fixture: ComponentFixture<GenraleInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenraleInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenraleInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
