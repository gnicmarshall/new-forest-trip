import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the same build works at the repo root, under a
// GitHub Pages sub-path (/new-forest-trip/), or opened from disk.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
});
