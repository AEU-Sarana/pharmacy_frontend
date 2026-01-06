import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    // Remove transition helper shortly after paint
    window.setTimeout(() => {
      root.classList.remove('theme-transition')
      body.classList.remove('theme-transition')
    }, 260)
  }, [dark])

  const toggleTheme = () => {
    const root = document.documentElement
    const body = document.body
    // Add a temporary transition class for smooth theme switching
    root.classList.add('theme-transition')
    body.classList.add('theme-transition')
    // Toggle immediately to avoid perceived delay; CSS handles smoothness
    setDark(prev => !prev)
  }

  const value = {
    dark,
    toggleTheme,
    setDark
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
