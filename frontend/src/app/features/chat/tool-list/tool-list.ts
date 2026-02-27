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
      descricao: 'Gerador de textos automáticos', 
      link_oficial: '#', 
      link_git: '',
      link_doc: ''
    },
    { 
      id: 2, 
      nome: 'Ferramenta 2', 
      descricao: 'analise', 
      link_oficial: '#', 
      link_git: '',
      link_doc: ''
    },
    { 
      id: 3, 
      nome: 'Ferramenta 3', 
      descricao: 'Gerador de textos automáticos', 
      link_oficial: '#', 
      link_git: '',
      link_doc: ''
    },
  ];

  onToolSelected(tool: any): void {
    if (tool) {
      this.router.navigate(['/tool', tool.nome]);
    } else {
      this.router.navigate(['/tool']);
    }
  }

}
