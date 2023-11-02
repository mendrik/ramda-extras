import { useEffect, useRef } from "preact/hooks"

import "./app.css"

import { signal } from "@preact/signals"
import { transformSync } from "@swc/wasm-web"
import { editor as E } from "monaco-editor"
import * as R from "ramda"

import { editorOptions } from "./config/editor"
import { options } from "./config/swc"
import { Output, output } from "./output"

Object.getOwnPropertyNames(R).forEach((name) =>
  R.assoc(name, R.propOr(undefined, name, R), window)
)

export const editor = signal<E.IStandaloneCodeEditor | null>(null)

const handleCodeChange = (): void => {
  if (output.value && editor.value) {
    try {
      const js = transformSync(editor.value.getValue(), options)
      const result: unknown = eval(js.code)
      if (result !== undefined) {
        output.value.setValue(
          JSON.stringify(result, null, 2).replace('"use strict"', "")
        )
      } else {
        output.value.setValue("")
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        output.value.getModel()?.setValue(`${e.message}\n${e.stack ?? ""}`)
      } else {
        output.value.getModel()?.setValue(`${e as string}`)
      }
      console.warn(e)
    }
  }
}

const debounced = (fn: () => void) => {
  // eslint-disable-next-line functional/no-let
  let id = -1
  return () => {
    clearTimeout(id)
    id = setTimeout(fn, 500)
  }
}

export const App = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      editor.value = E.create(ref.current, editorOptions)
      editor.value.onDidChangeModelContent(debounced(handleCodeChange))
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
      <Output />
    </>
  )
}
