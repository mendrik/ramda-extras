import { useEffect, useRef } from "preact/hooks"

import "./output.css"

import { signal } from "@preact/signals"
import { editor as E } from "monaco-editor"

export const output = signal<E.IStandaloneCodeEditor | null>(null)

type OwnProps = E.IStandaloneEditorConstructionOptions & {
  editor: E.IStandaloneCodeEditor | null
}

export const Output = ({ editor, ...props }: OwnProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      output.value = E.create(ref.current, {
        theme: "dracula",
        minimap: { enabled: false },
        lineNumbers: "off",
        renderLineHighlight: "none",
        language: "javascript",
        fontFamily: "Fira Code",
        fontLigatures: true,
        readOnly: true,
        fontSize: 14,
        ...props,
      })

      editor?.onDidChangeModelContent((e) => {
        console.log(editor.getValue())
      })
    }
  }, [props, ref, editor])

  return <div class="box output" ref={ref}></div>
}
