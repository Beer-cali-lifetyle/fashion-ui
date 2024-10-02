import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet],
  standalone: true
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
      this.loadScript('assets/js/jquery.js').then(() => {
        this.loadScript('assets/js/vendors.js').then(() => {
          this.loadScript('assets/js/main.js');
        });
      });
    // }
  }

  private loadScript(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer.appendChild(document.body, script);
    });
  }
}
