import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // if deploying to GitHub Pages with a custom repo name, change this to `'/repo-name/'`
});
