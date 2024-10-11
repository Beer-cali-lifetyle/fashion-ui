import { Injectable } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
    
  runAnimation(config: any): void {
    anime(config);
  }
}