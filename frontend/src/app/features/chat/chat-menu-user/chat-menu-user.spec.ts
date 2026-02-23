import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMenuUser } from './chat-menu-user';

describe('ChatMenuUser', () => {
  let component: ChatMenuUser;
  let fixture: ComponentFixture<ChatMenuUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMenuUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMenuUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
