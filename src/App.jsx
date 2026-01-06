import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FrontEndRoute from './front-end/routes/FrontEndRoute'
import BackendRoute from './back-end/routes/BackendRoute'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* All frontend routes */}
            <Route path="/*" element={<FrontEndRoute />} />
            
            {/* All backend/admin routes */}
            <Route path="/admin/*" element={<BackendRoute />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
