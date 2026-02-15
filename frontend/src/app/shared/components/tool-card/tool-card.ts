// tool-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tool-card.html',
  styleUrls: ['./tool-card.css']
})
export class ToolCard {
  @Input({ required: true }) tool!: any;

  constructor(private router: Router) {}

  viewTool(): void {
    if (this.tool) {
      this.router.navigate(['/tool', this.tool.nome]);
    } else {
      this.router.navigate(['/tool']);
    }
  }

  // Impede que o clique no link dispare o clique do card (stopPropagation)
  handleLinkClick(event: Event): void {
    event.stopPropagation();
  }
}