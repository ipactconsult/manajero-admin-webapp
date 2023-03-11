import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivityTeamComponent } from './ativity-team.component';

describe('AtivityTeamComponent', () => {
  let component: AtivityTeamComponent;
  let fixture: ComponentFixture<AtivityTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivityTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivityTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
