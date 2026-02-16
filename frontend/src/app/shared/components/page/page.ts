import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page',
  imports: [Menu, RouterOutlet],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {

}
