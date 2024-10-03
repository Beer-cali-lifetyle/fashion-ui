import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent]
})
export class ShopListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
