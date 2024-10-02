import 'zone.js/dist/zone-node'; // Required for Angular Universal
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import bootstrap from './src/main.server'; // Angular Universal bootstrap

// Create an Express server
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser'); // Path to the browser folder
  const indexHtml = existsSync(join(browserDistFolder, 'index.html'))
    ? 'index.html'
    : 'index.server.html'; // Use index.html or fallback to index.server.html

  const commonEngine = new CommonEngine();

  // Set view engine to HTML (although it’s not really used here)
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser directory (client-side build)
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y', // Cache static files for a year for performance
  }));

  // Serve all other routes with Angular Universal
  server.get('**', (req: Request, res: Response, next: NextFunction) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap, // The Angular Universal server-side app
        documentFilePath: join(browserDistFolder, indexHtml), // Server-side index
        url: `${protocol}://${headers.host}${originalUrl}`, // Full URL for routing
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl || '/' }], // Dynamic base href
      })
      .then((html) => res.send(html))
      .catch((err) => {
        console.error('Error during SSR', err);
        next(err); // Pass the error to next middleware
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000; // Set port from env or default to 4000

  // Start the server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Start the server only if the script is executed directly
if (require.main === module) {
  run();
}
