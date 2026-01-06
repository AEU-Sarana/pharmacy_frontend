import React, { useState, useEffect } from 'react'
import { useLanguage, t } from '../../../contexts/LanguageContext'
import { useTheme } from '../../../contexts/ThemeContext'

const Login = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [showPassword, setShowPassword] = useState(false)
  const { language, changeLanguage } = useLanguage()
  const toggleLanguage = () => changeLanguage(language === 'en' ? 'km' : 'en')
  const { dark, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen w-full bg-gray-50 dark:bg-gray-900 ${mounted ? 'opacity-100' : 'opacity-0'} `}> 
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Brand / Illustration */}
        <div className="hidden lg:flex relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c3a] via-[#0f4c3a] to-emerald-700" />
          <div className="absolute inset-0 opacity-10" aria-hidden>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-white">PharmaPOS</span>
              </div>
              <h1 className="mt-8 text-3xl xl:text-4xl font-bold text-white leading-tight">{t('loginWelcomeBack', language)}</h1>
              <p className="mt-2 text-white/80 text-sm max-w-md">{t('loginSubtitle', language)}</p>
            </div>
            <div className="text-white/70 text-xs">© {new Date().getFullYear()} PharmaPOS. All rights reserved.</div>
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-lg">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#0f4c3a] text-white flex items-center justify-center">P</div>
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">PharmaPOS</span>
              </div>
            </div>
            <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 sm:p-10 shadow-sm  ${mounted ? 'opacity-100 ' : 'opacity-0 '}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t('loginSignIn', language)}</h2>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{t('loginEnterCredentials', language)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                    {dark ? '☀️' : '🌙'}
                  </button>
                  <button type="button" onClick={toggleLanguage} className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                    {language === 'en' ? 'ខ្មែរ' : 'EN'}
                  </button>
                </div>
              </div>
              <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">{t('loginEmail', language)}</label>
                  <input type="email" placeholder="you@company.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]" required />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">{t('loginPassword', language)}</label>
                    <button type="button" className="text-xs text-[#0f4c3a] hover:underline" onClick={() => setShowPassword((s) => !s)}>{showPassword ? t('loginHide', language) : t('loginShow', language)}</button>
                  </div>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] pr-10" required />
                    <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><input type="checkbox" className="w-4 h-4" defaultChecked /> {t('loginRememberMe', language)}</label>
                  <a href="#" className="text-xs text-[#0f4c3a] hover:underline">{t('loginForgotPassword', language)}</a>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0f4c3a] text-white text-base font-semibold hover:brightness-110 transition-colors">{t('loginSignInButton', language)}</button>
              </form>
              <div className="mt-7 text-center text-xs text-gray-500 dark:text-gray-400">{t('loginAgreeTerms', language)}</div>
            </div>
            <div className="mt-7 text-center text-sm text-gray-600 dark:text-gray-300">
              {t('loginDontHaveAccount', language)} <a href="#" className="text-[#0f4c3a] font-semibold hover:underline">{t('loginCreateOne', language)}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
