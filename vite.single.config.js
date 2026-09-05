import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// One self-contained HTML file (no external assets). Used for hosting the
// app anywhere a single static page can be dropped in.
export default defineConfig({
  base: './',
  define: { 'import.meta.env.VITE_NO_SW': JSON.stringify('1') },
  plugins: [
    react(),
    viteSingleFile(),
    {
      name: 'strip-external-links',
      transformIndexHtml(html) {
        return html
          .replace(/\s*<link rel="manifest"[^>]*>/, '')
          .replace(/\s*<link rel="icon"[^>]*>/, '')
          .replace(/\s*<link rel="apple-touch-icon"[^>]*>/, '');
      },
    },
  ],
  build: { outDir: 'dist-single', sourcemap: false, assetsInlineLimit: 100000000 },
});
