import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useLanguage, t } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Stethoscope } from 'lucide-react'

const MasterLayout = () => {
  const location = useLocation()
  const { language } = useLanguage()
  const { dark, toggleTheme } = useTheme()
  return (
    <div className="min-h-screen bg-emerald-50/30 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-emerald-600 text-white">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="font-semibold">Pharmacy POS</span>
          </div>
          <nav className="text-sm flex items-center">
            <Link to="/" className={`px-3 py-2 rounded-lg hover:bg-white/10 ${location.pathname === '/' ? 'bg-white/10' : ''}`}>{t('dashboard', language)}</Link>
            <Link to="/pos" className={`ml-1 px-3 py-2 rounded-lg hover:bg-white/10 ${location.pathname.startsWith('/pos') ? 'bg-white/10' : ''}`}>{t('pos', language)}</Link>
            <button onClick={toggleTheme} className="ml-2 px-3 py-2 rounded-lg hover:bg-white/10" title={dark ? 'Switch to light' : 'Switch to dark'}>{dark ? '☀️' : '🌙'}</button>
          </nav>
        </div>
      </header>
      <main className="w-full px-6 py-6 text-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
    </div>
  )
}

export default MasterLayout
