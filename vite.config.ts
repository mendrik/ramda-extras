import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import svgr from "vite-plugin-svgr"
import autoprefixer from "autoprefixer"
import { visualizer } from "rollup-plugin-visualizer"

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
  plugins: [
    preact(),
    svgr(),
    visualizer({
      template: "treemap", // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "analyse.html" // will be saved in project's root
    })
  ]
})
