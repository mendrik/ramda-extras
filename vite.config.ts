import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import svgr from "vite-plugin-svgr"
import autoprefixer from "autoprefixer"

export default defineConfig({
  build: { outDir: "docs" },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  optimizeDeps: {
    exclude: ["@swc/wasm-web"]
  },
  plugins: [preact(), svgr()]
})
