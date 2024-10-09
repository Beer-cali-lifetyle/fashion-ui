import { Component, OnInit } from '@angular/core';
import { ScriptLoadComponent } from '../../script-load/script-load.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  standalone: true,
  imports: [
    ScriptLoadComponent
  ]
})
export class BlogListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
