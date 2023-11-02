import type { Options } from "@swc/wasm-web"

export const options: Options = {
  jsc: {
    parser: {
      syntax: "typescript",
      dynamicImport: true
    },
    target: "es2022"
  },
  module: {
    type: "commonjs"
  }
}
