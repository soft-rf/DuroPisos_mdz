import { defineConfig } from "vite";
import inject from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  plugins: [inject()],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        proyectos: resolve(__dirname, "src/proyectos.html"),
        durocrete: resolve(__dirname, "src/duro-crete.html"),
        durofix: resolve(__dirname, "src/duro-fix.html"),
        revoquecolor: resolve(__dirname, "src/revoque-color.html"),
        selladores: resolve(__dirname, "src/selladores.html"),
        faq: resolve(__dirname, "src/faq.html"),
      },
    },
  },
});
