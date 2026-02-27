// results-panel.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToolCard } from '../tool-card/tool-card';
import { ToolList } from '../../../features/chat/tool-list/tool-list';

@Component({
  selector: 'app-results-panel',
  standalone: true,
  imports: [CommonModule, ToolCard, ToolList],
  templateUrl: './results-panel.html',
  styleUrls: ['./results-panel.css']
})
export class ResultsPanel {
  private router = inject(Router);
  
  
   
  onToolSelected(tool: any): void {
    if (tool) {
      this.router.navigate(['/tool', tool.nome]);
    } else {
      this.router.navigate(['/tool']);
    }
  }
}