import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat-service';


@Component({
  selector: 'app-chat-menu-user',
  imports: [MatIcon],
  templateUrl: './chat-menu-user.html',
  styleUrl: './chat-menu-user.css',
})
export class ChatMenuUser {
  menuOpen = false; //var de controle pra abrir e fechar o emnu

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
