import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  plugins: [],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
