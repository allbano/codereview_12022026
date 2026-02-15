// results-panel.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolCard } from '../tool-card/tool-card';

@Component({
  selector: 'app-results-panel',
  standalone: true,
  imports: [CommonModule, ToolCard],
  templateUrl: './results-panel.html',
  styleUrls: ['./results-panel.css']
})
export class ResultsPanel {
  // Mock de dados (seguindo a estrutura que o seu ToolCard espera)
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
}