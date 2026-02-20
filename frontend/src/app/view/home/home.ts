import { Component } from '@angular/core';
import { HomeWindow } from '../../shared/components/home-window/home-window';
import { Menu } from '../../shared/components/menu/menu';

@Component({
  selector: 'app-home',
  imports: [HomeWindow, Menu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
