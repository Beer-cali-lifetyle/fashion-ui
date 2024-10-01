import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderGuard implements CanActivate {

  async canActivate(): Promise<boolean> {
    // await this.loadScripts(); 
    return true;
  }

  private loadScripts(): Promise<void[]> {
    const scripts = [
      { src: '/assets/js/vendors.js', id: 'vendors-script' },
      { src: '/assets/js/main.js', id: 'main-script' }
    ];

    const scriptPromises = scripts.map(script => this.loadScript(script));
    return Promise.all(scriptPromises);
  }

  private loadScript(script: { src: string, id: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!document.getElementById(script.id)) {
        const scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.id = script.id;
        scriptElement.async = true;
        scriptElement.onload = () => resolve(); // Resolve the promise when the script loads
        scriptElement.onerror = () => reject(); // Reject if there's an error loading the script
        document.body.appendChild(scriptElement);
      } else {
        resolve(); // If the script is already loaded, resolve immediately
      }
    });
  }
}
