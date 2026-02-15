import { Component } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [MenuItem, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

}
