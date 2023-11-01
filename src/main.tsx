import { render } from 'preact'

import './index.css'

import { Maybe } from 'purify-ts/Maybe'

import { App } from './app.tsx'
 
Maybe.fromNullable(document.getElementById('app')).ifJust(el => render(<App/>, el))
