import { useEffect, useRef } from "preact/hooks"

import "./app.css"

import { signal } from "@preact/signals"
import { editor as E } from "monaco-editor"
import * as P from "purify-ts"
import { keys } from "ramda"
import * as R from "ramda"
import * as RA from "ramda-adjunct"
import { transform } from "sucrase"

import { editorOptions } from "./config/editor"
import { Output, output } from "./output"

export const editor = signal<E.IStandaloneCodeEditor | null>(null)

const ramdaKeys = keys(R)
const ramdaAdjunctKeys = R.without(ramdaKeys, keys(RA))
const purifyKeys = R.without([...ramdaKeys, ...ramdaAdjunctKeys], keys(P))

const handleCodeChange = (): void => {
  if (output.value && editor.value) {
    try {
      const js = transform(editor.value.getValue(), {
        transforms: ["typescript"]
      })
      Object.defineProperties(window, {
        R: { value: R, writable: false },
        RA: { value: RA, writable: false },
        P: { value: P, writable: false }
      })
      const code = `
        const {${ramdaKeys.join(",")}} = R;
        const {${ramdaAdjunctKeys.join(",")}} = RA;
        const {${purifyKeys.join(",")}} = P;
       ${js.code}`

      const result: unknown = window.eval(code)
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
        <h2 className="title" data-title="ramda, ramda-adjunct, purify-ts">
          ramda, ramda-adjunct, purify-ts
        </h2>
      </nav>
      <div class="box editor" ref={ref}></div>
      <Output />
    </>
  )
}
