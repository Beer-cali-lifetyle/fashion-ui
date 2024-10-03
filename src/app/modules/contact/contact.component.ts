import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from "../script-load/script-load.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [ScriptLoadComponent, ScriptLoadComponent]
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
