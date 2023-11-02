import { useEffect, useRef } from "preact/hooks"

import "./output.css"

import { signal } from "@preact/signals"
import { editor as E } from "monaco-editor"

export const output = signal<E.IStandaloneCodeEditor | null>(null)

export const Output = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      output.value = E.create(ref.current, {
        theme: "dracula",
        minimap: { enabled: false },
        lineNumbers: "off",
        language: "javascript",
        renderLineHighlight: "none",
        fontFamily: "Fira Code",
        fontLigatures: true,
        readOnly: true,
        fontSize: 14
      })
    }
  }, [ref])

  return <div class="box output" ref={ref}></div>
}
