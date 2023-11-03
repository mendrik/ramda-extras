import { transpile } from "typescript"
import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import svgr from "vite-plugin-svgr"
import autoprefixer from "autoprefixer"

export default defineConfig({
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        interop: "compat",
        generatedCode: "es2015"
      }
    }
  },
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
