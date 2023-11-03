import { editor as E, languages } from "monaco-editor"

import theme from "../assets/dracula.theme.json"
import { conf, language } from "./tslang"

const myLang = "ramda-typescript"

E.defineTheme("dracula", theme as E.IStandaloneThemeData)
languages.register({ id: myLang })
languages.setLanguageConfiguration(myLang, conf)
languages.setMonarchTokensProvider(myLang, language)

export const editorOptions: E.IStandaloneEditorConstructionOptions = {
  theme: "dracula",
  automaticLayout: true,
  showFoldingControls: "mouseover",
  minimap: { enabled: false },
  lineNumbers: "off",
  renderLineHighlight: "none",
  language: myLang,
  fontFamily: "Fira Code",
  fontLigatures: true,
  fontSize: 14
}
