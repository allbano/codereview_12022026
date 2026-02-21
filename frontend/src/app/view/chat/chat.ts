import { Component } from '@angular/core';
import { ChatWindow } from '../../features/chat/chat-window/chat-window';

@Component({
  selector: 'app-chat',
  imports: [ChatWindow],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {

}
