import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraleInfoFormComponent } from './generale-info-form.component';

describe('GeneraleInfoFormComponent', () => {
  let component: GeneraleInfoFormComponent;
  let fixture: ComponentFixture<GeneraleInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneraleInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneraleInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
