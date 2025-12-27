import { defineConfig } from "vite";
import ssi from "vite-plugin-ssi";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  publicDir: "../public",
  plugins: [

  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
