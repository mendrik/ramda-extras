import "./nav.css"

import { IconBook2, IconCopy, IconIndentIncrease } from "@tabler/icons-react"

import { editor } from "../input/input"

const goToRamdaDocs = () => window.open("https://ramdajs.com/docs/")

const copyCode = () => {
  const code = editor.value?.getValue()
  if (code) {
    const url = new URL(document.location.href)
    url.searchParams.set("code", code)
    void navigator.clipboard.writeText(url.toString())
  }
}

const format = () => {
  void editor.value?.getAction("editor.action.formatDocument")?.run()
}

export const Nav = () => (
  <nav>
    <h2 className="title" data-title="ramda, ramda-adjunct, purify-ts">
      ramda, ramda-adjunct, purify-ts
    </h2>
    <ul className="utils">
      <li>
        <button onClick={goToRamdaDocs}>
          <IconBook2 stroke={1} />
          Docs
        </button>
      </li>
      <li>
        <button onClick={copyCode}>
          <IconCopy stroke={1} />
          Share
        </button>
      </li>
      <li>
        <button onClick={format}>
          <IconIndentIncrease stroke={1} />
          Format
        </button>
      </li>
    </ul>
  </nav>
)
