import { render } from "preact"

import "./index.css"

import { editor as E } from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { Maybe } from "purify-ts/Maybe"

import { App } from "./app.tsx"
import theme from "./assets/dracula.theme.json"

E.defineTheme("dracula", theme as E.IStandaloneThemeData)

self.MonacoEnvironment = {
  getWorker: (_, label) => {
    if (label === "json") {
      return new jsonWorker()
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker()
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker()
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker()
    }
    return new editorWorker()
  },
}

Maybe.fromNullable(document.getElementById("app")).ifJust((el) =>
  render(<App />, el)
)
