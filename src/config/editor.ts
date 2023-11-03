import { editor as E, languages, Uri } from "monaco-editor"

import theme from "../assets/dracula.theme.json"
import purifyTypes from "../assets/purify-ts/esm/index.d.ts?raw"

const typeDeclaration = `declare global {\n ${[purifyTypes].join("\n")} };`

console.log(typeDeclaration)

const libUri = "ts:filename/ramda-extras.d.ts"

languages.typescript.javascriptDefaults.addExtraLib(typeDeclaration, libUri)
E.createModel(typeDeclaration, "typescript", Uri.parse(libUri))

E.defineTheme("dracula", theme as E.IStandaloneThemeData)

export const initialCode =
  new URLSearchParams(document.location.search).get("code") ?? undefined

export const editorOptions: E.IStandaloneEditorConstructionOptions = {
  theme: "dracula",
  automaticLayout: true,
  showFoldingControls: "mouseover",
  minimap: { enabled: false },
  lineNumbers: "on",
  renderLineHighlight: "none",
  language: "typescript",
  fontFamily: "Fira Code",
  fontLigatures: true,
  fontSize: 14,
  value: initialCode,
  scrollbar: {
    useShadows: false
  }
}
