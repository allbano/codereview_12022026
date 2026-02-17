import { Component, inject } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import { ChatService } from '../../../services/chat-service';

@Component({
  selector: 'app-chat-menu',
  imports: [MenuItem],
  templateUrl: './chat-menu.html',
  styleUrl: './chat-menu.css',
})
// chat-menu.component.ts
export class ChatMenu {
  private chatService = inject(ChatService);
  
  sessions = this.chatService.sessions;
  currentId = this.chatService.currentSessionId;

  selectSession(uuid: string) {
    this.chatService.currentSessionId.set(uuid);
    // Aqui você carregaria as mensagens específicas desse UUID
  }

  newChat() {
    this.chatService.createNewSession();
  }

  clean(){
    this.chatService.cleanSessions();
  }
}
