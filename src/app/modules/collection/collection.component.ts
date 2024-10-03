import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent]
})
export class CollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
