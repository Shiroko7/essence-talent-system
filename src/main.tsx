import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Import essence data files
import './components/essences/consts/water.tsx';
import './components/essences/consts/fire.tsx';
import './components/essences/consts/earth.tsx';
import './components/essences/consts/metal.tsx';
import './components/essences/consts/wood.tsx';
import './components/essences/consts/poison.tsx';
import './components/essences/consts/acid.tsx';
import './components/essences/consts/lightning.tsx';
import './components/essences/consts/air.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
