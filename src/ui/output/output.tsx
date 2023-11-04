import { useEffect, useRef } from "preact/hooks"

import "./output.css"

import { signal } from "@preact/signals"
import { editor as E } from "monaco-editor"
import type { Signal } from "@preact/signals"

import { viewerOptions } from "../../config/viewer"

export const output: Signal<E.IStandaloneCodeEditor | null> = signal(null)

export const Output = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      output.value = E.create(ref.current, viewerOptions)
    }
  }, [ref])

  return <div class="box output" ref={ref}></div>
}
