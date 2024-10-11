import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../core/services/script-loader.service';
import anime from 'animejs/lib/anime.es.js';

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
    await this.scriptService.loadScripts();
    await this.initAnimeAnimations();
  }

  initAnimeAnimations(): void {
    const animatedElements = document.querySelectorAll('[data-custom-anime]');

    animatedElements.forEach((el) => {
      const data = JSON.parse(el.getAttribute('data-custom-anime') || '{}');

      // Default animation options
      const options: anime.AnimeParams = {
        targets: el as HTMLElement, // Cast to HTMLElement
        translateY: data.translateY || [0, 0],
        opacity: data.opacity || [0, 1],
        duration: data.duration || 600,
        delay: data.delay || 100,
        easing: data.easing || "easeOutQuad",
        translateX: data.translateX || [0, 0],
      };

      if (data.el === "childs") {
        // Convert HTMLCollection to an array of HTMLElement
        options.targets = Array.from(el.children) as HTMLElement[]; // Cast to HTMLElement[]
        options.delay = anime.stagger(data.staggervalue || 150);
      }

      // Trigger the animation using anime.js
      anime(options);
    });
  }

  async ngOnDestroy() {
    await this.scriptService.removeAllScripts();
  }

}
