import { Injectable, signal } from '@angular/core';

export interface ChatSession {
  uuid: string;
  title: string;
  date: Date;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  // Lista reativa de sessões
  sessions = signal<ChatSession[]>(this.loadSessions());
  
  // Sessão atualmente ativa
  currentSessionId = signal<string | null>(null);

  private loadSessions(): ChatSession[] {
    const saved = localStorage.getItem('chat_sessions');
    return saved ? JSON.parse(saved) : [];
  }

  createNewSession(): string | null {
    if(this.sessions().length >= 10 ){
      console.log("\nlimite de chat alcançado!!!!!\n")
      return null;
    } 
      const newUuid = crypto.randomUUID(); // Gera UUID v4 nativo
      const newSession: ChatSession = {
        uuid: newUuid,
        title: `Conversa ${this.sessions().length + 1}`,
        date: new Date()
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