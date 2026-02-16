// chat-window.component.ts
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultsPanel } from '../../shared/components/results-panel/results-panel';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultsPanel],
  templateUrl: './chat-window.html',
  styleUrls: ['./chat-window.css']
})


export class ChatWindow implements AfterViewChecked {
  constructor(private cdr: ChangeDetectorRef) {}

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  inputmsg = '';
  loading = false;
  messages: any[] = [];

  // Scroll automático sempre que a vista mudar (novas mensagens)
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

 enviar() {
    if (!this.inputmsg.trim() || this.loading) return;

    const userText = this.inputmsg;
    this.loading = true;

    // 1. Adiciona a mensagem do usuário recriando o array (Spread Operator)
    this.messages = [...this.messages, { role: 'user', text: userText }];
    this.inputmsg = '';

    // 2. Simula resposta do Assistente
    setTimeout(() => {
      // Criamos o objeto da resposta
      const responseMsg = {
        role: 'assistant',
        text: 'mensagem de exemplo (LLM vem aqui)',
        showResults: true
      };

      // 3. Adiciona a resposta recriando o array novamente
      // Isso força o Angular a renderizar o @for e o @if internos
      this.messages = [...this.messages, responseMsg];
      this.loading = false;
      console.log("\n loading = "+this.loading)
      console.log('\nMensagens atuais:', this.messages);

      //força o angular a atualizar
      this.cdr.detectChanges();
    }, 1200);
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {}
  }
}