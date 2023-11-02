import { useEffect, useRef } from "preact/hooks"

import "./app.css"

import { signal } from "@preact/signals"
import { editor as E } from "monaco-editor"

import theme from "./assets/dracula.theme.json"
import { Output } from "./output"

const editor = signal<E.IStandaloneCodeEditor | null>(null)

export const App = (props: E.IStandaloneEditorConstructionOptions) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      E.defineTheme("dracula", theme as E.IStandaloneThemeData)
      editor.value = E.create(ref.current, {
        theme: "dracula",
        showFoldingControls: "mouseover",
        minimap: { enabled: false },
        lineNumbers: "off",
        renderLineHighlight: "none",
        language: "typescript",
        fontFamily: "Fira Code",
        fontLigatures: true,
        fontSize: 14,
        scrollbar: {
          verticalScrollbarSize: 10,
        },
        ...props,
      })
    }
  }, [props, ref])

  return (
    <>
      <nav>
        <h2 className="title" data-title="ramda with extras">
          ramda with extras
        </h2>
      </nav>
      <div class="box editor" ref={ref}></div>

      <Output />
    </>
  )
}
