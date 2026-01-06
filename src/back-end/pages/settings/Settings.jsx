import { useEffect, useState } from 'react'
import { Save, Shield, Bell, Palette, Globe } from 'lucide-react'
import { useTheme } from '../../../contexts/ThemeContext'

const Settings = () => {
  const [mounted, setMounted] = useState(false)
  const { dark, toggleTheme } = useTheme()
  useEffect(() => setMounted(true), [])

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h1 className={`text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight ${mounted ? 'opacity-100' : 'opacity-0'}`}>Settings</h1>
              <p className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 ${mounted ? 'opacity-100' : 'opacity-0'}`}>Manage app preferences, notifications, and security</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6">
            {/* Left nav */}
            <aside className={`hidden lg:block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 h-fit sticky top-4  ${mounted ? 'opacity-100 ' : 'opacity-0 '}`}>
              <nav className="space-y-1 text-sm">
                {[
                  { id: 'appearance', label: 'Appearance', Icon: Palette },
                  { id: 'notifications', label: 'Notifications', Icon: Bell },
                  { id: 'security', label: 'Security', Icon: Shield },
                  { id: 'localization', label: 'Localization', Icon: Globe },
                ].map(({ id, label, Icon }) => (
                  <a key={id} href={`#${id}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Icon className="w-4 h-4 text-[#0f4c3a]" />
                    <span>{label}</span>
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="space-y-6">
              {/* Appearance */}
              <section id="appearance" className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Palette className="w-5 h-5 text-[#0f4c3a]" /><h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Appearance</h2></div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Personalize look & feel</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Theme</label>
                    <select 
                      value={dark ? 'dark' : 'light'} 
                      onChange={(e) => {
                        if (e.target.value === 'dark' && !dark) toggleTheme()
                        if (e.target.value === 'light' && dark) toggleTheme()
                      }}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Accent color</label>
                    <div className="mt-1 flex items-center gap-3">
                      <input type="color" defaultValue="#0f4c3a" className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600 bg-transparent" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Used for highlights and buttons</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section id="notifications" className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Bell className="w-5 h-5 text-[#0f4c3a]" /><h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h2></div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Control what you receive</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Low stock alerts</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Notify when inventory falls below threshold</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"><span className="inline-block h-5 w-5 translate-x-1 rounded-full bg-white shadow transition-transform"></span></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Expiry reminders (30d)</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get reminded 30 days before expiry</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#0f4c3a] transition-colors"><span className="inline-block h-5 w-5 translate-x-5 rounded-full bg-white shadow transition-transform"></span></button>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section id="security" className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-sm  ${mounted ? 'opacity-100 ' : 'opacity-0 '}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-[#0f4c3a]" /><h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security</h2></div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Keep your account safe</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Two‑factor authentication</label>
                    <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Require 2FA on login</span>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"><span className="inline-block h-5 w-5 translate-x-1 rounded-full bg-white shadow transition-transform"></span></button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Session timeout</label>
                    <select className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"><option>30 min</option><option>60 min</option><option>90 min</option></select>
                  </div>
                </div>
              </section>

              {/* Localization */}
              <section id="localization" className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 shadow-sm  ${mounted ? 'opacity-100 ' : 'opacity-0 '}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-[#0f4c3a]" /><h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Localization</h2></div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">Language & time</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Language</label>
                    <select className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"><option>English</option><option>Khmer</option></select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Timezone</label>
                    <select className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"><option>UTC+07:00</option><option>UTC</option></select>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sticky Save Bar */}
          <div className="sticky bottom-4 flex items-center justify-end">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl px-3 sm:px-4 py-2 ml-auto">
              <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#0f4c3a] text-white text-sm font-semibold hover:brightness-110 transition-colors"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings



