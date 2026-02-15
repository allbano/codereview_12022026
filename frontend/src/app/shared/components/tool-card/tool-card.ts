// tool-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  viewTool(): void {
    this.toolSelected.emit(this.tool);
  }

  // Impede que o clique no link dispare o clique do card (stopPropagation)
  handleLinkClick(event: Event): void {
    event.stopPropagation();
  }
}