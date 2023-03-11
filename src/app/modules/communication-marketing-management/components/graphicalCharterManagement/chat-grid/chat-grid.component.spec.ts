import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGridComponent } from './chat-grid.component';

describe('ChatGridComponent', () => {
  let component: ChatGridComponent;
  let fixture: ComponentFixture<ChatGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
