import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';
import { ModalConfirm } from '../../../../shared/components/modal-confirm/modal-confirm';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

//puxam o user back
import { UserService } from '../../../user/services/user-service';


@Component({
  selector: 'app-chat-menu-user',
  imports: [MatIcon, MatDialogModule],
  templateUrl: './chat-menu-user.html',
  styleUrl: './chat-menu-user.css',
})

export class ChatMenuUser {
  menuOpen = false; //var de controle pra abrir e fechar o emnu
  constructor(private dialog: MatDialog) {
    //para o modal de confirmação
  }

  private router = inject(Router);
  private chatService = inject(ChatService);

  //user de teste
  private userService = inject(UserService);
  user = this.userService.currentUser;
  
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

  confirmarSaida(){
    const dialogRef = this.dialog.open(ModalConfirm, {
  });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('usuário saiu')
        this.userService.logout();
        this.goBack();
      }
    });
  }
}
