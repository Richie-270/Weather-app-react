import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InputWeather from './components/InputWeather'
import Weather from './components/Weather'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InputWeather />
    <Weather />
  </StrictMode>,
)
