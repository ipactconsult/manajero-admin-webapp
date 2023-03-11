import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGlobalCharterComponent } from './details-global-charter.component';

describe('DetailsGlobalCharterComponent', () => {
  let component: DetailsGlobalCharterComponent;
  let fixture: ComponentFixture<DetailsGlobalCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGlobalCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGlobalCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
