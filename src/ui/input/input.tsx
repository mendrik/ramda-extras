import { useEffect, useRef } from "preact/hooks"

import "./input.css"

import { signal } from "@preact/signals"
import { editor as E } from "monaco-editor"
import * as P from "purify-ts"
import * as R from "ramda"
import { keys, without } from "ramda"
import * as RA from "ramda-adjunct"

import { editorOptions } from "../../config/editor"
import { handleCodeChange } from "../../logic/handleCodeChange"

export const editor = signal<E.IStandaloneCodeEditor | null>(null)

export const ramdaKeys = keys(R)
export const ramdaAdjunctKeys = without(ramdaKeys, keys(RA))
export const purifyKeys = without([...ramdaKeys, ...ramdaAdjunctKeys], keys(P))

const debounced = (fn: () => void) => {
  // eslint-disable-next-line functional/no-let
  let id = -1
  return () => {
    clearTimeout(id)
    id = setTimeout(fn, 500)
  }
}

export const Input = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      editor.value = E.create(ref.current, editorOptions)
      editor.value.onDidChangeModelContent(debounced(handleCodeChange))
    }
  }, [ref])

  return <div class="box editor" ref={ref}></div>
}
