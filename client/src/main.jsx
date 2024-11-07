import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom"

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
  </BrowserRouter>
)