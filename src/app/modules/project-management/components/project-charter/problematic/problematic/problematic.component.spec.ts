import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblematicComponent } from './problematic.component';

describe('ProblematicComponent', () => {
  let component: ProblematicComponent;
  let fixture: ComponentFixture<ProblematicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblematicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
