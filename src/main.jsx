import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DashboardContext } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DashboardContext>
    <App />
  </DashboardContext>
  </BrowserRouter>
)
