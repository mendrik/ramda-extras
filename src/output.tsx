import { useEffect, useRef } from "preact/hooks"

import "./output.css"

import { signal } from "@preact/signals"
import { transformSync } from "@swc/wasm-web"
import { editor as E } from "monaco-editor"
import type { Options } from "@swc/wasm-web"

const options: Options = {
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

export const output = signal<E.IStandaloneCodeEditor | null>(null)

type OwnProps = {
  editor: E.IStandaloneCodeEditor | null
}

export const Output = ({ editor }: OwnProps) => {
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

      editor?.onDidChangeModelContent(() => {
        if (output.value) {
          try {
            const js = transformSync(editor.getValue(), options)
            const result: unknown = eval(js.code)
            output.value.setValue(JSON.stringify(result))
          } catch (e: unknown) {
            if (e instanceof Error) {
              output.value
                .getModel()
                ?.setValue(`${e.message}\n${e.stack ?? ""}`)
            } else {
              output.value.getModel()?.setValue(`${e as string}`)
            }
            console.warn(e)
          }
        }
      })
    }
  }, [ref, editor])

  return <div class="box output" ref={ref}></div>
}
