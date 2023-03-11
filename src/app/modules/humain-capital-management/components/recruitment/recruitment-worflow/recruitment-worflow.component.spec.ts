import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentWorflowComponent } from './recruitment-worflow.component';

describe('RecruitmentWorflowComponent', () => {
  let component: RecruitmentWorflowComponent;
  let fixture: ComponentFixture<RecruitmentWorflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentWorflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentWorflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
