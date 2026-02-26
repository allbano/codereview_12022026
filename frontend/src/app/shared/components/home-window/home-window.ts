import { Component, OnInit, inject, signal } from '@angular/core';
import { ToolCard } from '../tool-card/tool-card';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { UserProfile } from '../../../features/model/user.interface';

@Component({
  selector: 'app-home-window',
  standalone: true,
  imports: [ToolCard],
  templateUrl: './home-window.html',
  styleUrl: './home-window.css',
})

export class HomeWindow implements OnInit { 
  private router = inject(Router);
  private userService = inject(UserService);
  
  user = signal<UserProfile | null>(null);

  ngOnInit() {
    // Chamando o ID 1 para teste
    this.userService.getUser(1).subscribe({
      next: (data) => {
        console.log('Usuário carregado:', data);
        this.user.set(data); 
      },
      error: (err) => console.error('Erro ao buscar usuário', err)
    });
  }


  tools = [
    { 
      id: 1, 
      nome: 'Ferramenta 1', 
      finalidade: 'Gerador de textos automáticos', 
      link_oficial: '#', 
      requer_programacao: false, 
      rMedia: 4.5 
    },
    { 
      id: 2, 
      nome: 'Ferramenta 2', 
      finalidade: 'Análise de sentimento em tempo real', 
      link_oficial: '#', 
      requer_programacao: true, 
      rMedia: 4.8 
    },
    { 
      id: 3, 
      nome: 'Ferramenta 3', 
      finalidade: 'Gerador de imagens via IA', 
      link_oficial: '#', 
      requer_programacao: false, 
      rMedia: 4.2 
    }
  ];

  onToolSelected(tool: any): void {
    if (tool) {
      this.router.navigate(['/tool', tool.nome]);
    } else {
      this.router.navigate(['/tool']);
    }
  }
}
