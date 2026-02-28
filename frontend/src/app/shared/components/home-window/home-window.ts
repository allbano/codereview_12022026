import { Component, OnInit, inject, signal } from '@angular/core';
import { ToolCard } from '../tool-card/tool-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-window',
  standalone: true,
  imports: [ToolCard],
  templateUrl: './home-window.html',
  styleUrl: './home-window.css',
})

export class HomeWindow { 
  private router = inject(Router);

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
