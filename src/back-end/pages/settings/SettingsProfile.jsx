"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit3, 
  Save, 
  X,
  Camera,
  Key,
  Bell,
  Globe,
  Lock,
  Palette,
  Settings as SettingsIcon
} from "lucide-react"
import { useTheme } from "../../../contexts/ThemeContext"
import { useLanguage, t } from "../../../contexts/LanguageContext"

const SettingsProfile = () => {
  const location = useLocation()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  
  const { dark, toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()

  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    position: "Administrator",
    location: "New York, USA",
    joinDate: "January 15, 2023",
    avatar: null,
    bio: "Experienced administrator with expertise in system management and user support.",
    timezone: "Eastern Time (UTC-5)"
  })

  // Form data for editing
  const [formData, setFormData] = useState({ ...profileData })

  // Password change data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    monthlyReports: true,
    securityAlerts: true,
    lowStockAlerts: true,
    expiryReminders: true
  })

  // Settings data
  const [settingsData, setSettingsData] = useState({
    theme: dark ? 'dark' : 'light',
    accentColor: '#0f4c3a',
    language: 'English',
    timezone: 'UTC+07:00',
    twoFactorAuth: false,
    sessionTimeout: '30 min'
  })

  useEffect(() => {
    setMounted(true)
    // Set active tab based on URL path
    if (location.pathname.includes('/settings')) {
      setActiveTab('settings')
    } else {
      setActiveTab('profile')
    }
  }, [location.pathname])

  const handleEdit = () => {
    setFormData({ ...profileData })
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfileData({ ...formData })
    setIsEditing(false)
    console.log('Profile updated:', formData)
  }

  const handleCancel = () => {
    setFormData({ ...profileData })
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert(t('passwordsDoNotMatch', language))
      return
    }
    console.log('Password changed')
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShowChangePassword(false)
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSettingsChange = (key, value) => {
    setSettingsData(prev => ({
      ...prev,
      [key]: value
    }))
    
    if (key === 'theme') {
      if (value === 'dark' && !dark) toggleTheme()
      if (value === 'light' && dark) toggleTheme()
    }
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id: 'profile', label: t('profile', language), icon: User },
    { id: 'settings', label: t('settings', language), icon: SettingsIcon }
  ]

  if (!mounted) {
    return (
      <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0f4c3a]"></div>
      </div>
    )
  }

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('settingsManagement', language)}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{t('manageProfileSettings', language)}</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-[#0f4c3a] text-[#0f4c3a] dark:text-green-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Profile Overview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6">
                
                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt={t('profile', language)} 
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-[#0f4c3a] to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                      <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{profileData.position}</p>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{t('joined', language)} {profileData.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>{profileData.position}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0f4c3a] text-white rounded-lg hover:bg-[#0f4c3a]/90 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    {t('editProfile', language)}
                  </button>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    {t('changePassword', language)}
                  </button>
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    {t('notifications', language)}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('personalInformation', language)}</h3>
                  {isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#0f4c3a] text-white rounded-lg hover:bg-[#0f4c3a]/90 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('firstName', language)}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-100">{profileData.firstName}</span>
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('lastName', language)}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-100">{profileData.lastName}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('emailAddress', language)}
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-100">{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('phoneNumber', language)}
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-100">{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('position', language)}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-100">{profileData.position}</span>
                      </div>
                    )}
                  </div>


                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('location', language)}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-100">{profileData.location}</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bio */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('bio', language)}
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-900 dark:text-gray-100">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab Content */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            {/* Appearance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#0f4c3a]" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('appearance', language)}</h2>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('personalizeLookFeel', language)}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{t('theme', language)}</label>
                  <select 
                    value={settingsData.theme} 
                    onChange={(e) => handleSettingsChange('theme', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="light">{t('light', language)}</option>
                    <option value="dark">{t('dark', language)}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{t('accentColor', language)}</label>
                  <div className="mt-1 flex items-center gap-3">
                    <input 
                      type="color" 
                      value={settingsData.accentColor}
                      onChange={(e) => handleSettingsChange('accentColor', e.target.value)}
                      className="w-10 h-8 rounded border border-gray-300 dark:border-gray-600 bg-transparent" 
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{t('usedForHighlights', language)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#0f4c3a]" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('notificationsSettings', language)}</h2>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('controlWhatReceive', language)}</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('lowStockAlerts', language)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('notifyWhenInventoryFalls', language)}</p>
                  </div>
                  <button 
                    onClick={() => handleNotificationChange('lowStockAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.lowStockAlerts ? 'bg-[#0f4c3a]' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      notifications.lowStockAlerts ? 'translate-x-5' : 'translate-x-1'
                    }`}></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('expiryReminders', language)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('getReminded30Days', language)}</p>
                  </div>
                  <button 
                    onClick={() => handleNotificationChange('expiryReminders')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.expiryReminders ? 'bg-[#0f4c3a]' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      notifications.expiryReminders ? 'translate-x-5' : 'translate-x-1'
                    }`}></span>
                  </button>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0f4c3a]" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('security', language)}</h2>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('keepAccountSafe', language)}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{t('twoFactorAuth', language)}</label>
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t('require2FAOnLogin', language)}</span>
                    <button 
                      onClick={() => handleSettingsChange('twoFactorAuth', !settingsData.twoFactorAuth)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settingsData.twoFactorAuth ? 'bg-[#0f4c3a]' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        settingsData.twoFactorAuth ? 'translate-x-5' : 'translate-x-1'
                      }`}></span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{t('sessionTimeout', language)}</label>
                  <select 
                    value={settingsData.sessionTimeout}
                    onChange={(e) => handleSettingsChange('sessionTimeout', e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="30 min">30 min</option>
                    <option value="60 min">60 min</option>
                    <option value="90 min">90 min</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Localization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0f4c3a]" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('localization', language)}</h2>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('languageTime', language)}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{t('language', language)}</label>
                  <select 
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="en">{t('english', language)}</option>
                    <option value="km">{t('khmer', language)}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{t('timezone', language)}</label>
                  <select 
                    value={settingsData.timezone}
                    onChange={(e) => handleSettingsChange('timezone', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="UTC+07:00">UTC+07:00</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0f4c3a] text-white text-sm font-semibold hover:bg-[#0f4c3a]/90 transition-colors">
                <Save className="w-4 h-4" />
                {t('saveChanges', language)}
              </button>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('changePasswordTitle', language)}</h3>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('currentPassword', language)}
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('newPassword', language)}
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('confirmNewPassword', language)}
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t('cancel', language)}
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 px-4 py-2 bg-[#0f4c3a] text-white rounded-lg hover:bg-[#0f4c3a]/90 transition-colors"
                >
                  {t('changePassword', language)}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Modal */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('notificationPreferences', language)}</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {key.includes('email') && t('receiveEmailNotifications', language)}
                        {key.includes('push') && t('receivePushNotifications', language)}
                        {key.includes('sms') && t('receiveSmsNotifications', language)}
                        {key.includes('weekly') && t('getWeeklySummaryReports', language)}
                        {key.includes('monthly') && t('getMonthlySummaryReports', language)}
                        {key.includes('security') && t('getSecurityAlertsUpdates', language)}
                        {key.includes('lowStock') && t('getLowStockAlerts', language)}
                        {key.includes('expiry') && t('getExpiryReminders', language)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-[#0f4c3a]' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t('cancel', language)}
                </button>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="flex-1 px-4 py-2 bg-[#0f4c3a] text-white rounded-lg hover:bg-[#0f4c3a]/90 transition-colors"
                >
                  {t('savePreferences', language)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsProfile
