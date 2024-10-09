import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { ToasterComponent } from './shared/ui/toaster/toaster.component';
import { ScriptLoadComponent } from './modules/script-load/script-load.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, LoaderComponent, ToasterComponent, ScriptLoadComponent],
  standalone: true
})
export class AppComponent {
  constructor(
  ) { }

}
