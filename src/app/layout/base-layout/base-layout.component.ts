import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';
import { ScriptLoadComponent } from '../../modules/script-load/script-load.component';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    ScriptLoadComponent,
    LoaderComponent
]
})
export class BaseLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
