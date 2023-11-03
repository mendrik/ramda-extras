import "./app.css"

import { effect, signal } from "@preact/signals"

import { handleCodeChange } from "../../logic/handleCodeChange"
import { editor, Input } from "../input/input"
import { Nav } from "../nav/nav"
import { Output, output } from "../output/output"

const initialized = signal(false)

effect(() => {
  if (!initialized.value && editor.value && output.value) {
    initialized.value = true
    handleCodeChange()
  }
})

export const App = () => (
  <>
    <Nav />
    <Input />
    <Output />
  </>
)
