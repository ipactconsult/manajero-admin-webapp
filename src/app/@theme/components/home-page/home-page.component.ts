import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../menu/pages-menu';

@Component({
  selector: 'ngx-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}
