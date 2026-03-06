import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface ChatSession {
  uuid: string;
  title: string;
  date: string;
  messages: any[];
}

@Injectable({ providedIn: 'root' })

export class ChatService {
  private router = inject(Router);

  // Lista reativa de sessões
  sessions = signal<ChatSession[]>(this.loadSessions());
  
  // Sessão atualmente ativa
  currentSessionId = signal<string | null>(null);

  private loadSessions(): ChatSession[] {
    const saved = localStorage.getItem('chat_sessions');
    return saved ? JSON.parse(saved) : [];
  }

  addMessage(message: any) {
    const currentId = this.currentSessionId();
    if (!currentId) return;

    // Atualizamos o array de sessões de forma imutável
    this.sessions.update(allSessions => {
      const updated = allSessions.map(session => {
        if (session.uuid === currentId) {
          return {
            ...session,
            messages: [...(session.messages || []), message]
          };
        }
        return session;
      });
      
      this.saveToStorage(updated); // Salva no localStorage
      return updated;
    });
  }

  createNewSession(): string | null {
    if(this.sessions().length >= 10 ){
      console.log("\nlimite de chat alcançado!!!!!\n")
      return null;
    } 
      const newUuid = crypto.randomUUID(); // Gera UUID v4 nativo
      //cria data
      const curDate = new Date();

      const newSession: ChatSession = {
        uuid: newUuid,
        title: `Conversa ${this.sessions().length + 1}`,
        date: `${curDate.getDate()}/${curDate.getMonth()+1}/${curDate.getFullYear()} - ${curDate.getHours()}:${curDate.getMinutes()}`,
        messages: []
    };
    // Mantém apenas as 10 mais recentes
    const updatedSessions = [newSession, ...this.sessions()].slice(0, 10);
    
    this.sessions.set(updatedSessions);
    this.saveToStorage(updatedSessions);
    this.currentSessionId.set(newUuid);

    return newUuid;
  }

    cleanSessions(): void {
      this.sessions.set([]);
      this.currentSessionId.set(null);
      localStorage.removeItem('chat_sessions');
      console.log("lista de sessões limpas")
    }

  private saveToStorage(sessions: ChatSession[]) {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  }
}