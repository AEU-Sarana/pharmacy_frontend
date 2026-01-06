"use client"

import { useState, useEffect } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FileText,
  TrendingUp,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Building2,
  ChevronDown,
  User,
  Globe,
} from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"
import { useLanguage, t } from "../../contexts/LanguageContext"

const MasterLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { dark, toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()

  const navItems = [
    { path: "/admin", label: t('overview', language), icon: LayoutDashboard },
    { path: "/admin/products", label: t('products', language), icon: Package },
    { path: "/admin/customers", label: t('customers', language), icon: Users },
    { path: "/admin/suppliers", label: t('suppliers', language), icon: Building2 },
    { path: "/admin/sales", label: t('sales', language), icon: ShoppingCart },
    { path: "/admin/wholesale/quick-order", label: t('quickOrder', language), icon: ShoppingCart },
    { path: "/admin/wholesale/price-lists", label: t('priceLists', language), icon: FileText },
    { path: "/admin/inventory", label: t('inventory', language), icon: TrendingUp },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileDropdownOpen])

  const handleLogout = () => {
    setShowLogoutModal(false)
    setProfileDropdownOpen(false)
    navigate('/admin/login')
  }

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f4c3a] dark:bg-gray-800 text-white transform lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Pharmacy Management System" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-white dark:text-gray-100">Pharmy</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white dark:text-gray-200">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    active ? "bg-[#7ed957] dark:bg-green-500 text-[#0f4c3a] dark:text-gray-900 font-medium" : "text-white/90 dark:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 space-y-1 border-t border-white/10 dark:border-gray-600">
            <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 w-full text-white/90 dark:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-700 rounded-lg">
              <Settings className="w-5 h-5" />
              <span>{t('settings', language)}</span>
            </Link>
              <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 dark:text-red-400 hover:bg-white/10 dark:hover:bg-gray-700 rounded-lg" title="Logout super admin">
              <LogOut className="w-5 h-5" />
              <span>{t('logout', language)}</span>
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Pharmacy Management System" className="w-8 h-8 object-contain" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:block">Pharmacy Management</h1>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] w-64"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => changeLanguage(language === 'en' ? 'km' : 'en')}
                title={language === 'en' ? 'Switch to Khmer' : 'Switch to English'}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'EN' : 'ខ្មែរ'}
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {dark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 3.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V4A.75.75 0 0112 3.25zM18.364 5.636a.75.75 0 011.06 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061zM20.75 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5H20a.75.75 0 01.75.75zM18.364 18.364a.75.75 0 10-1.061-1.06l-1.06 1.06a.75.75 0 101.06 1.062l1.061-1.062zM12 18.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM7.757 17.303a.75.75 0 00-1.06 1.061l1.06 1.061a.75.75 0 101.061-1.061l-1.061-1.061zM4.75 12a.75.75 0 00.75-.75H4a.75.75 0 000 1.5h1.5A.75.75 0 004.75 12zM7.757 6.697a.75.75 0 101.06-1.061L7.757 4.575a.75.75 0 10-1.06 1.061l1.06 1.061z" />
                    <path d="M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M21.752 15.002A9.718 9.718 0 0112.75 22C7.09 22 2.5 17.41 2.5 11.75c0-3.77 2.07-7.04 5.126-8.79.6-.348 1.27.27 1.046.92A7.5 7.5 0 0019.33 13.83c.65.223 1.268-.448.92-1.047a9.72 9.72 0 01-1.498-2.297z" clipRule="evenodd" />
                  </svg>
                )}
                {dark ? 'Light' : 'Dark'}
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-2 transition-colors"
                >
                  <img src="/images/dashboard-profile.jpg" alt={t('admin', language)} className="w-10 h-10 rounded-full object-cover" />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('adminUser', language)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">{t('administrator', language)}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-50">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false)
                        navigate('/admin/profile')
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false)
                        setShowLogoutModal(true)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('confirmLogout', language)}</h3>
                <p className="text-base text-gray-500 dark:text-gray-400">{t('areYouSureLogout', language)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                {t('cancel', language)}
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {t('logout', language)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MasterLayout
