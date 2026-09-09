import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv, type Plugin } from 'vite';

const routes = new Set(['start-otp', 'resend-otp', 'verify-otp', 'session', 'logout', 'forgot-password', 'content']);
type ApiResponse = ServerResponse & { status: (code: number) => ApiResponse };

export function adminApiPlugin(mode: string): Plugin {
  return {
    name: 'local-admin-api',
    apply: 'serve',
    configureServer(server) {
      // Server secrets stay in the Node process; Vite only exposes VITE_ values.
      const env = loadEnv(mode, process.cwd(), '');
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }
      server.middlewares.use('/api/admin', async (req, rawResponse) => {
        const route = (req.url || '').split('?')[0].slice(1);
        const res = rawResponse as ApiResponse;
        res.status = (code) => { res.statusCode = code; return res; };
        res.setHeader('Content-Type', 'application/json');
        if (!routes.has(route)) {
          res.status(404).end(JSON.stringify({ error: 'Not found.' }));
          return;
        }
        try {
          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            size += chunk.length;
            if (size > 1024 * 1024) {
              res.status(413).end(JSON.stringify({ error: 'Request too large.' }));
              return;
            }
            chunks.push(Buffer.from(chunk));
          }
          const request = req as IncomingMessage & { body?: unknown };
          try {
            request.body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : {};
          } catch {
            res.status(400).end(JSON.stringify({ error: 'Invalid JSON.' }));
            return;
          }
          const url = pathToFileURL(path.resolve('api/admin', `${route}.js`)).href;
          const { default: handler } = await import(/* @vite-ignore */ url);
          await handler(request, res);
        } catch (error) {
          console.error('Local admin API error:', error);
          res.status(500).end(JSON.stringify({ error: 'Local admin API failed. Check server configuration.' }));
        }
      });
    },
  };
}
