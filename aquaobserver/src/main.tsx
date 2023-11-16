import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import History from './components/history-page'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <History></History>
  </React.StrictMode>,
)
