import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ModalProvider } from './context/ModalContext'
import App from './App'
import '../css/style.css'
import './app.css'
import './tailwind.css'
import 'lenis/dist/lenis.css'

const rootEl = document.getElementById('root')

// Use hydration if react-snap pre-rendered the page, plain render otherwise
if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootEl,
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ModalProvider>
            <App />
          </ModalProvider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ModalProvider>
            <App />
          </ModalProvider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
}
