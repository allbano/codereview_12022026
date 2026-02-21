// chat-window.component.ts
import { Component, ElementRef, ViewChild, AfterViewChecked, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultsPanel } from '../../../shared/components/results-panel/results-panel';

import { ChangeDetectorRef } from '@angular/core';
import { ChatMenu } from '../chat-menu/chat-menu';
import { ChatService } from '../../../services/chat-service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultsPanel, ChatMenu],
  templateUrl: './chat-window.html',
  styleUrls: ['./chat-window.css']
})


export class ChatWindow implements AfterViewChecked {
  constructor(private cdr: ChangeDetectorRef) {}
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeMessages = computed(() => { //SESSION.ID JÁ EXISTE? ENTÃO PEGA A LISTA DE MENSAGENS
    const currentId = this.chatService.currentSessionId();
    const session = this.chatService.sessions().find(s => s.uuid === currentId);
    return session ? session.messages : [];
  });

  //GERADOR DE UUID
  private chatService = inject(ChatService);
  // Acessamos o ID da sessão atual
  sessionId = this.chatService.currentSessionId;

  ngOnInit() {
    // Se não houver sessão ativa ao abrir, cria uma
    if (!this.sessionId()) {
      this.chatService.createNewSession();
    }
    //seta uuid na rota
    this.route.params.subscribe(params => {
      const uuidDaUrl = params['uuid'];
      
      if (uuidDaUrl) {
        // Sincroniza o serviço com o UUID da URL
        this.chatService.currentSessionId.set(uuidDaUrl);
      }
    });
  }
  ////////////////////////////////////////////////////

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  inputmsg = '';
  loading = false;
  // Scroll automático sempre que a vista mudar (novas mensagens)
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

 enviar() {
    // Se por algum motivo não houver UUID, gera antes de enviar
    if (!this.sessionId()) {
      this.chatService.createNewSession();
    }
    const uuidAtual = this.sessionId();
    console.log(`Enviando mensagem na sessão: ${uuidAtual}`);

    //salva a mensagem do usuário no array
    const userMsg = { role: 'user', text: this.inputmsg };
    this.chatService.addMessage(userMsg);

    if (!this.inputmsg.trim() || this.loading) return;

    const userText = this.inputmsg;
    this.loading = true;
    this.inputmsg = '';

    //vai para a rota desta session
    this.router.navigate(['/chat', uuidAtual]);
    // 2. Simula resposta do Assistente
    setTimeout(() => {
      const responseMsg = {
        role: 'assistant',
        text: 'mensagem de exemplo (LLM vem aqui)',
        showResults: true
      };
      //Salva a resposta na sessão
      this.chatService.addMessage(responseMsg);

      // 3. Adiciona a resposta recriando o array novamente
      this.loading = false;
      console.log('\nmsgs:', this.activeMessages());
      //força o angular a atualizar
      this.cdr.detectChanges();
    }, 1000);
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {}
  }
}