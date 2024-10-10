import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../core/services/script-loader.service';

@Component({
  selector: 'app-script-load',
  templateUrl: './script-load.component.html',
  styleUrls: ['./script-load.component.css'],
  standalone: true
})
export class ScriptLoadComponent implements AfterViewInit, OnDestroy                             {
  constructor(
    private scriptService: ScriptLoaderService
  ) { }

  async ngAfterViewInit() {
    await this.scriptService.loadScripts()
  }

  async ngOnDestroy() {
    await this.scriptService.removeAllScripts();
  }

}
