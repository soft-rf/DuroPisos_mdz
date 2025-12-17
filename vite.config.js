import { defineConfig } from 'vite';
import ssi from 'vite-plugin-ssi';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  plugins: [ssi({
    remoteBasePath: ''
  })],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
