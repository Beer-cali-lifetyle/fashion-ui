import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScriptLoaderService } from './core/services/script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet],
  standalone: true
})
export class AppComponent {
  constructor(
    private scriptService: ScriptLoaderService
  ) { }

  async ngAfterViewInit() {
    // await this.scriptService.loadScripts()
  }

  // private loadScript(src: string): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const script = this.renderer.createElement('script');
  //     script.src = src;
  //     script.onload = resolve;
  //     script.onerror = reject;
  //     this.renderer.appendChild(document.body, script);
  //   });
  // }
}
