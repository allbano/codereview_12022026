import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToolCard } from '../../../shared/components/tool-card/tool-card';

@Component({
  selector: 'app-tool-list',
  imports: [ToolCard],
  templateUrl: './tool-list.html',
  styleUrl: './tool-list.css',
})
export class ToolList {
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
