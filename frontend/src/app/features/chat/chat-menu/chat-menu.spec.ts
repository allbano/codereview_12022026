import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMenu } from './chat-menu';

describe('ChatMenu', () => {
  let component: ChatMenu;
  let fixture: ComponentFixture<ChatMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
