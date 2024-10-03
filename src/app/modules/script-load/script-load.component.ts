import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../core/services/script-loader.service';

@Component({
  selector: 'app-script-load',
  templateUrl: './script-load.component.html',
  styleUrls: ['./script-load.component.css'],
  standalone: true
})
export class ScriptLoadComponent implements AfterViewInit  {
  constructor(
    private scriptService: ScriptLoaderService
  ) { }

  async ngAfterViewInit() {
    await this.scriptService.loadScripts()
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
