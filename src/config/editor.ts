import { editor as E, languages, Uri } from 'monaco-editor'

import theme from '../assets/dracula.theme.json'
import purifyTypes from '../assets/purify-ts/esm/index.d.cts?raw'
import ramdaAdjunctTypes from '../assets/ramda-adjunct/types/index.d.d.cts?raw'
import ramdaTypes from '../assets/types-ramda/es/index.d.d.cts?raw'
 

const typeDeclaration = `
  ${[ramdaTypes, ramdaAdjunctTypes, purifyTypes].join('\n\n')}
`

const libUri = 'file:///node_modules/@types/ramda-extras/index.d.ts'
const tsDef = languages.typescript.typescriptDefaults

tsDef.addExtraLib(typeDeclaration, libUri)
tsDef.setCompilerOptions({
  ...tsDef.getCompilerOptions(),
  lib: ['es2023'],
  module: languages.typescript.ModuleKind.CommonJS,
  moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs
})
E.createModel(typeDeclaration, 'typescript', Uri.parse('file:///main.tsx'))
E.defineTheme('dracula', theme as E.IStandaloneThemeData)

export const initialCode = new URLSearchParams(document.location.search).get('code') ?? undefined

export const editorOptions: E.IStandaloneEditorConstructionOptions = {
  theme: 'dracula',
  automaticLayout: true,
  showFoldingControls: 'mouseover',
  minimap: { enabled: false },
  lineNumbers: 'on',
  renderLineHighlight: 'none',
  language: 'typescript',
  fontFamily: 'Fira Code',
  fontLigatures: true,
  fontSize: 14,
  autoIndent: 'full',
  formatOnPaste: true,
  value: initialCode,
  scrollbar: {
    useShadows: false
  },
  tabSize: 2,
  insertSpaces: true
}
