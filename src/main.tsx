import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter를 import 합니다.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* App 컴포넌트를 BrowserRouter로 감싸줍니다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
