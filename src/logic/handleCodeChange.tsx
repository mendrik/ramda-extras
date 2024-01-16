import * as P from 'purify-ts'
import * as R from 'ramda'
import { join, keys, without } from 'ramda'
import * as RA from 'ramda-adjunct'
import { transform } from 'sucrase'

import { editor } from '../ui/input/input'
import { output } from '../ui/output/output'
import { logData } from './logger'

export const ramdaKeys = keys(R)
export const ramdaAdjunctKeys = without(ramdaKeys, keys(RA))
export const purifyKeys = without([...ramdaKeys, ...ramdaAdjunctKeys], keys(P))

export const handleCodeChange = (): void => {
  if (output.value && editor.value) {
    try {
      // convert to js
      const js = transform(editor.value.getValue(), {
        transforms: ['typescript']
      })

      logData.value = []

      // expose libs as window globals
      Object.defineProperties(window, {
        R: { value: R, writable: false },
        RA: { value: RA, writable: false },
        P: { value: P, writable: false }
      })


      
      // expose global imports
      const code = `
        const {${ramdaKeys.join(',')}} = R;
        const {${ramdaAdjunctKeys.join(',')}} = RA;
        const {${purifyKeys.join(',')}} = P;
        ${js.code}
      `

      // run code
      const result: unknown = window.eval(code)
      const loggedText = logData.value.map(join(', ')).join('\n')

      // show result
      if (result !== undefined) {
        const evalText = JSON.stringify(result, null, 2).replace('"use strict"', '')
        output.value.setValue(loggedText + '\n' + evalText)
      } else if (loggedText !== ''){
        output.value.setValue(loggedText)
      } else {
        output.value.setValue('')
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        output.value.getModel()?.setValue(`${e.message}\n${e.stack ?? ''}`)
      } else {
        output.value.getModel()?.setValue(`${e as string}`)
      }
      console.warn(e)
    }
  }
}
