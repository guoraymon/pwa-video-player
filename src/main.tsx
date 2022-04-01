import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import App from './App'
import { registerSW } from 'virtual:pwa-register'

registerSW()

ReactDOM.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>,
  document.getElementById('root')
)