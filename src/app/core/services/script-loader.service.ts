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

    private loadScriptFunc(src: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const script = this.renderer.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            this.renderer.appendChild(document.body, script);
        });
    }


}