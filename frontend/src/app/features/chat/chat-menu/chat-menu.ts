import { Component, inject } from '@angular/core';
import { ChatService } from '../../../services/chat-service';
import { Router } from '@angular/router';
import { MenuItem } from '../../../shared/components/menu-item/menu-item';

@Component({
  selector: 'app-chat-menu',
  imports: [MenuItem],
  templateUrl: './chat-menu.html',
  styleUrl: './chat-menu.css',
})
// chat-menu.component.ts
export class ChatMenu {
  private router = inject(Router);
  private chatService = inject(ChatService);
  
  sessions = this.chatService.sessions;
  currentId = this.chatService.currentSessionId;

  selectSession(uuid: string) {
    //vai para o uuid da sessão
    this.router.navigate(['/chat', uuid]);
  }

  newChat() {
    this.router.navigate(['/chat', this.chatService.createNewSession()]);
  }

  clean(){
    this.chatService.cleanSessions();
    this.router.navigate(['/chat']);
  }

   goBack(){
    this.router.navigate(['/']);
  }
}
