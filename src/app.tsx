import { useEffect, useRef } from "preact/hooks"

import "./app.css"

import { signal } from "@preact/signals"
import { editor as E } from "monaco-editor"

import { Output } from "./output"

export const editor = signal<E.IStandaloneCodeEditor | null>(null)

export const App = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      editor.value = E.create(ref.current, {
        theme: "dracula",
        showFoldingControls: "mouseover",
        minimap: { enabled: false },
        lineNumbers: "off",
        renderLineHighlight: "none",
        language: "typescript",
        fontFamily: "Fira Code",
        fontLigatures: true,
        fontSize: 14
      })
    }
  }, [ref])

  return (
    <>
      <nav>
        <h2 className="title" data-title="typescript ramda with extras">
          typescript ramda with extras
        </h2>
      </nav>
      <div class="box editor" ref={ref}></div>
      <Output editor={editor.value} />
    </>
  )
}
