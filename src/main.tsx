import { render } from "preact"

import "./index.css"

import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { Maybe } from "purify-ts/Maybe"

import { App } from "./ui/app/app.tsx"

self.MonacoEnvironment = {
  getWorker: () => new tsWorker()
}

const app = document.getElementById("app")

Maybe.fromNullable(app).map((el) => render(<App />, el))
