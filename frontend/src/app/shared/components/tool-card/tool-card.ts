// tool-card.component.ts
import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolService } from '../../../services/tool-service';
import { ToolInfo } from '../../../features/model/tool.interface';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-card.html',
  styleUrls: ['./tool-card.css']
})
export class ToolCard {
  @Input({ required: true }) tool!: any;
  @Output() toolSelected = new EventEmitter<any>();

  //puxa tool do back
  private toolService = inject(ToolService);
  toolI = signal<ToolInfo | null>(null);
  ngOnInit() {
    this.toolService.getTool('019c7b2c-08fa-7566-949c-352ecdece9df').subscribe({
      next: (data) => {
        console.log('Dados da ferramenta recebidos:', data);
        this.toolI.set(data);
      },
      error: (err) => {
        console.error('Erro ao buscar ferramenta:', err);
      }
    });
  }

  viewTool(): void {
    this.toolSelected.emit(this.tool);
  }

  // Impede que o clique no link dispare o clique do card (stopPropagation)
  handleLinkClick(event: Event): void {
    event.stopPropagation();
  }
}