import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ThemeProvider } from './ThemeContext'
import { LanguageProvider } from './LanguageContext'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
  <LanguageProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </LanguageProvider>
  </ThemeProvider>
)