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

  logoBgAzul = 'assets/images/logo-bg-azul.jpg';
  textoBgAzul = 'assets/images/texto-bg-azul.jpg';
  

  onToolSelected(tool: any): void {
    if (tool) {
      this.router.navigate(['/tool', tool.nome]);
    } else {
      this.router.navigate(['/tool']);
    }
  }
}
