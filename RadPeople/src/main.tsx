import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render the rest of the app as usual
createRoot(document.getElementById('root')!).render(
  <App />
)