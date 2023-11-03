import type { editor as E } from "monaco-editor"

export const viewerOptions: E.IStandaloneEditorConstructionOptions = {
  theme: "dracula",
  automaticLayout: true,
  minimap: { enabled: false },
  lineNumbers: "off",
  language: "javascript",
  renderLineHighlight: "none",
  fontFamily: "Fira Code",
  fontLigatures: true,
  readOnly: true,
  fontSize: 14
}
