import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root' // This makes the service available application-wide
})
export class ScriptLoaderService {
    private renderer: Renderer2;
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    loadScripts(): void {
        this.loadScriptFunc('assets/js/jquery.js').then(() => {
            this.loadScriptFunc('assets/js/vendors.js').then(() => {
                this.loadScriptFunc('assets/js/main.js');
            });
        });
    }

    loadScriptFunc(src: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const existingScript = await document.querySelector(`script[src="${src}"]`);
            // If script already exists, remove it
            if (!existingScript) {
                const script = await document.createElement('script');
                script.src = await src;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                await document.body.appendChild(script);
            }
        });
    }


    removeAllScripts(): Promise<void> {
        return new Promise((resolve, reject) => {
          try {
            const allScripts = document.querySelectorAll('script');
            sessionStorage.clear();
            this.clearAllCookies();
            allScripts.forEach((script) => {
              script.remove();
            });
            resolve(); 
          } catch (error) {
            reject(new Error('Failed to remove all scripts: ' + error));
          }
        });
      }
      

    clearAllCookies(): void {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    }

}