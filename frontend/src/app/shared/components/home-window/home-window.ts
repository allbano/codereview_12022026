import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-window',
  standalone: true,
  imports: [],
  templateUrl: './home-window.html',
  styleUrl: './home-window.css',
})

export class HomeWindow { 
  private router = inject(Router);

  logoBgAzul = 'assets/images/logo-bg-azul.jpg';
  textoBgAzul = 'assets/images/texto-bg-azul.jpg';
}
