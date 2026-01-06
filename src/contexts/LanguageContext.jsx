"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    const saved = localStorage.getItem('language')
    if (saved) return saved
    return 'en'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translation object
export const translations = {
  en: {
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    loading: 'Loading...',
    admin: 'Admin',
    adminUser: 'Admin User',
    administrator: 'Administrator',
    
    // Settings Management
    settingsManagement: 'Settings Management',
    manageProfileSettings: 'Manage your profile and application settings',
    profile: 'Profile',
    settings: 'Settings',
    
    // Profile
    personalInformation: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    position: 'Position',
    location: 'Location',
    bio: 'Bio',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    notifications: 'Notifications',
    joined: 'Joined',
    saveChanges: 'Save Changes',
    
    // Settings
    appearance: 'Appearance',
    personalizeLookFeel: 'Personalize look & feel',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    accentColor: 'Accent color',
    usedForHighlights: 'Used for highlights and buttons',
    
    notificationsSettings: 'Notifications',
    controlWhatReceive: 'Control what you receive',
    lowStockAlerts: 'Low stock alerts',
    notifyWhenInventoryFalls: 'Notify when inventory falls below threshold',
    expiryReminders: 'Expiry reminders (30d)',
    getReminded30Days: 'Get reminded 30 days before expiry',
    
    security: 'Security',
    keepAccountSafe: 'Keep your account safe',
    twoFactorAuth: 'Two‑factor authentication',
    require2FAOnLogin: 'Require 2FA on login',
    sessionTimeout: 'Session timeout',
    
    localization: 'Localization',
    languageTime: 'Language & time',
    language: 'Language',
    english: 'English',
    khmer: 'Khmer',
    timezone: 'Timezone',
    
    // Modals
    confirmLogout: 'Confirm Logout',
    areYouSureLogout: 'Are you sure you want to logout?',
    logout: 'Logout',
    changePasswordTitle: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    notificationPreferences: 'Notification Preferences',
    savePreferences: 'Save Preferences',
    
    // Notification descriptions
    receiveEmailNotifications: 'Receive notifications via email',
    receivePushNotifications: 'Receive push notifications',
    receiveSmsNotifications: 'Receive SMS notifications',
    getWeeklySummaryReports: 'Get weekly summary reports',
    getMonthlySummaryReports: 'Get monthly summary reports',
    getSecurityAlertsUpdates: 'Get security alerts and updates',
    getLowStockAlerts: 'Get low stock alerts',
    getExpiryReminders: 'Get expiry reminders',
    
    // Navigation
    overview: 'Overview',
    products: 'Products',
    customers: 'Customers',
    suppliers: 'Suppliers',
    sales: 'Sales',
    reports: 'Reports',
    inventory: 'Inventory',
    
    // Dashboard
    dashboard: 'Dashboard',
    revenue: 'Revenue',
    prescriptions: 'Prescriptions',
    sinceLastWeek: 'Since last week',
    dispensedThisMonth: 'Dispensed this month',
    totalCustomers: 'Total customers',
    itemsInStock: 'Items in stock',
    recentOrders: 'Recent Orders',
    orderId: 'Order ID',
    customer: 'Customer',
    amount: 'Amount',
    status: 'Status',
    date: 'Date',
    lowStock: 'Low Stock',
    itemName: 'Item Name',
    currentStock: 'Current Stock',
    minimumLevel: 'Minimum Level',
    action: 'Action',
    restock: 'Restock',
    viewAll: 'View All',
    quickActions: 'Quick Actions',
    addProduct: 'Add Product',
    addCustomer: 'Add Customer',
    generateReport: 'Generate Report',
    manageInventory: 'Manage Inventory',
    expiringSoon: 'Expiring Soon',
    within60Days: 'Within 60 days',
    operationalSnapshot: 'Operational snapshot of prescriptions, stock, and revenue',
    
    // Inventory
    inventoryManagement: 'Inventory Management',
    trackStockLevels: 'Track stock levels and manage inventory',
    addItem: 'Add Item',
    searchItems: 'Search items...',
    allItems: 'All Items',
    bulkActions: 'Bulk Actions',
    selectAll: 'Select All',
    deleteSelected: 'Delete Selected',
    exportSelected: 'Export Selected',
    itemId: 'Item ID',
    
    // Products
    productManagement: 'Product Management',
    manageProducts: 'Manage your product catalog',
    searchProducts: 'Search products...',
    allProducts: 'All Products',
    productName: 'Product Name',
    sku: 'SKU',
    price: 'Price',
    
    // Customers
    customerManagement: 'Customer Management',
    manageCustomers: 'Manage customer information and orders',
    searchCustomers: 'Search customers...',
    allCustomers: 'All Customers',
    customerName: 'Customer Name',
    email: 'Email',
    phone: 'Phone',
    orders: 'Orders',
    totalSpent: 'Total Spent',
    lastOrder: 'Last Order',
    viewDetails: 'View Details',
    contact: 'Contact',
    noCustomersFound: 'No customers found',
    
    // Suppliers
    supplierManagement: 'Supplier Management',
    manageSuppliers: 'Manage supplier information and contracts',
    addSupplier: 'Add Supplier',
    searchSuppliers: 'Search suppliers...',
    allSuppliers: 'All Suppliers',
    supplierName: 'Supplier Name',
    company: 'Company',
    address: 'Address',
    contractDate: 'Contract Date',
    paymentTerms: 'Payment Terms',
    noSuppliersFound: 'No suppliers found',
    rating: 'Rating',
    
    // Sales
    salesManagement: 'Sales Management',
    manageSales: 'Track sales performance and transactions',
    totalSales: 'Total Sales',
    todaySales: 'Today Sales',
    monthlySales: 'Monthly Sales',
    weeklySales: 'Weekly Sales',
    salesTarget: 'Sales Target',
    achievement: 'Achievement',
    topProducts: 'Top Products',
    recentTransactions: 'Recent Transactions',
    transactionId: 'Transaction ID',
    totalrevenue: 'Total Revenue',
    totalprofit: 'Total Profit',
    totalcost: 'Total Cost',
    avgordervalue: 'Avg. Order Value',
    sincelastweek: 'Since last week',
    ordersByTime: 'Orders By Time',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    less: 'Less',
    more: 'More',
    recentOrder: 'Recent Order',
    medicineName: 'Medicine Name',
    orderStatus: 'Order Status',
    paymentStatus: 'Payment Status',
    sold: 'sold',
    dispensingAnalytics: 'Dispensing Analytics',
    monthlyPrescriptionsDispensed: 'Monthly prescriptions dispensed',
    topSellingMedicines: 'Top Selling Medicines',
    stockAlerts: 'Stock Alerts',
    criticalAndExpiring: 'Critical and expiring',
    qty: 'Qty',
    latestPrescriptions: 'Latest Prescriptions',
    viewDetails: 'View details',
    moreOptions: 'More options',
    
    // Forms
    add: 'Add',
    update: 'Update',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Reports
    financialOperationalInsights: 'Financial and operational insights',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisYear: 'This Year',
    advanced: 'Advanced',
    exportCsv: 'Export CSV',
    categoryContribution: 'Category Contribution',
    antibiotics: 'Antibiotics',
    analgesics: 'Analgesics',
    vitamins: 'Vitamins',
    dermatology: 'Dermatology',
    metric: 'Metric',
    value: 'Value',
    delta: 'Delta',
    errorOccurred: 'An error occurred',
    pleaseTryAgain: 'Please try again',
    
    // Validation
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    passwordMismatch: 'Passwords do not match',
    minLength: 'Minimum length is {min} characters',
    maxLength: 'Maximum length is {max} characters',

    // Login
    loginWelcomeBack: 'Welcome back',
    loginSubtitle: 'Sign in to manage inventory, sales, and reports in your pharmacy dashboard.',
    loginSignIn: 'Sign in',
    loginEnterCredentials: 'Enter your credentials to access your account',
    loginEmail: 'Email',
    loginPassword: 'Password',
    loginShow: 'Show',
    loginHide: 'Hide',
    loginRememberMe: 'Remember me',
    loginForgotPassword: 'Forgot password?',
    loginSignInButton: 'Sign in',
    loginAgreeTerms: 'By signing in, you agree to our Terms & Privacy.',
    loginDontHaveAccount: 'Don’t have an account?',
    loginCreateOne: 'Create one',
    
    // Wholesale
    wholesale: 'Wholesale',
    quickOrder: 'Quick Order',
    priceLists: 'Price Lists',
    createOrder: 'Create Order',
    customerSearchPlaceholder: 'Search customer or create new...',
    addItemBySku: 'Add item by SKU or scan barcode',
    unitPrice: 'Unit Price',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    discount: 'Discount',
    total: 'Total',
    finalizeOrder: 'Finalize Order',
    newPriceList: 'New Price List',
    listName: 'List Name',
    effectiveFrom: 'Effective From',
    effectiveTo: 'Effective To',
    appliesTo: 'Applies To',
    saveList: 'Save List',

    // POS (Front cashier)
    pos: 'POS',
    scanOrSearch: 'Scan barcode or search products...',
    cart: 'Cart',
    checkout: 'Checkout',
    clearCart: 'Clear Cart',
    payCash: 'Pay Cash',
    discountPercent: 'Discount (%)',
    received: 'Received',
    changeDue: 'Change due',
  },
  
  km: {
    // Common
    save: 'រក្សាទុក',
    cancel: 'បោះបង់',
    edit: 'កែសម្រួល',
    delete: 'លុប',
    confirm: 'បញ្ជាក់',
    loading: 'កំពុងផ្ទុក...',
    admin: 'អ្នកគ្រប់គ្រង',
    adminUser: 'អ្នកប្រើ Admin',
    administrator: 'អ្នកគ្រប់គ្រង',
    
    // Settings Management
    settingsManagement: 'ការគ្រប់គ្រងការកំណត់',
    manageProfileSettings: 'គ្រប់គ្រងប្រវត្តិរូប និងការកំណត់កម្មវិធីរបស់អ្នក',
    profile: 'ប្រវត្តិរូប',
    settings: 'ការកំណត់',
    
    // Profile
    personalInformation: 'ព័ត៌មានផ្ទាល់ខ្លួន',
    firstName: 'នាម',
    lastName: 'នាមត្រកូល',
    emailAddress: 'អាសយដ្ឋាន Email',
    phoneNumber: 'លេខទូរស័ព្ទ',
    position: 'មុខតំណែង',
    location: 'ទីតាំង',
    bio: 'ព័ត៌មានផ្ទាល់ខ្លួន',
    editProfile: 'កែសម្រួល Profile',
    changePassword: 'ផ្លាស់ប្តូរពាក្យសម្ងាត់',
    notifications: 'ការជូនដំណឹង',
    joined: 'ចូលរួម',
    saveChanges: 'រក្សាទុកការផ្លាស់ប្តូរ',
    
    // Settings
    appearance: 'រចនាប័ទ្ម',
    personalizeLookFeel: 'ប្តូររចនាប័ទ្ម និងអារម្មណ៍',
    theme: 'រចនាប័ទ្ម',
    light: 'ពន្លឺ',
    dark: 'ងងឹត',
    accentColor: 'ពណ៌សំខាន់',
    usedForHighlights: 'ប្រើសម្រាប់ highlights និងប៊ូតុង',
    
    notificationsSettings: 'ការជូនដំណឹង',
    controlWhatReceive: 'គ្រប់គ្រងអ្វីដែលអ្នកទទួល',
    lowStockAlerts: 'ការជូនដំណឹងស្តុកទាប',
    notifyWhenInventoryFalls: 'ជូនដំណឹងនៅពេលស្តុកធ្លាក់ក្រោមកម្រិត',
    expiryReminders: 'ការរំលឹកផុតកំណត់ (30ថ្ងៃ)',
    getReminded30Days: 'ទទួលការរំលឹក 30 ថ្ងៃមុនផុតកំណត់',
    
    security: 'សុវត្ថិភាព',
    keepAccountSafe: 'រក្សាគណនីអ្នកឲ្យមានសុវត្ថិភាព',
    twoFactorAuth: 'ការផ្ទៀងផ្ទាត់ពីរជំហាន',
    require2FAOnLogin: 'តម្រូវ 2FA នៅពេល login',
    sessionTimeout: 'ពេលវេលាផុតកំណត់ session',
    
    localization: 'ការកំណត់ទីតាំង',
    languageTime: 'ភាសា និងពេលវេលា',
    language: 'ភាសា',
    english: 'អង់គ្លេស',
    khmer: 'ខ្មែរ',
    timezone: 'តំបន់ពេលវេលា',
    
    // Modals
    confirmLogout: 'បញ្ជាក់ការចេញ',
    areYouSureLogout: 'តើអ្នកប្រាកដថាចង់ចេញឬទេ?',
    logout: 'ចេញ',
    changePasswordTitle: 'ផ្លាស់ប្តូរពាក្យសម្ងាត់',
    currentPassword: 'ពាក្យសម្ងាត់បច្ចុប្បន្ន',
    newPassword: 'ពាក្យសម្ងាត់ថ្មី',
    confirmNewPassword: 'បញ្ជាក់ពាក្យសម្ងាត់ថ្មី',
    notificationPreferences: 'ចំណូលចិត្តការជូនដំណឹង',
    savePreferences: 'រក្សាទុកចំណូលចិត្ត',
    
    // Notification descriptions
    receiveEmailNotifications: 'ទទួលការជូនដំណឹងតាមរយៈអ៊ីមែល',
    receivePushNotifications: 'ទទួលការជូនដំណឹង Push',
    receiveSmsNotifications: 'ទទួលការជូនដំណឹង SMS',
    getWeeklySummaryReports: 'ទទួលរបាយការណ៍សង្ខេបប្រចាំសប្តាហ៍',
    getMonthlySummaryReports: 'ទទួលរបាយការណ៍សង្ខេបប្រចាំខែ',
    getSecurityAlertsUpdates: 'ទទួលការជូនដំណឹង និងព័ត៌មានសុវត្ថិភាព',
    getLowStockAlerts: 'ទទួលការជូនដំណឹងស្តុកទាប',
    getExpiryReminders: 'ទទួលការរំលឹកផុតកំណត់',
    
    // Navigation
    overview: 'ទិដ្ឋភាពទូទៅ',
    products: 'ផលិតផល',
    customers: 'អតិថិជន',
    suppliers: 'អ្នកផ្គត់ផ្គង់',
    sales: 'ការលក់',
    reports: 'របាយការណ៍',
    inventory: 'ស្តុក',
    
    // Dashboard
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    revenue: 'ចំណូល',
    prescriptions: 'វេជ្ជបញ្ជា',
    sinceLastWeek: 'តាំងពីសប្តាហ៍មុន',
    dispensedThisMonth: 'បានចែកចាយខែនេះ',
    totalCustomers: 'អតិថិជនសរុប',
    itemsInStock: 'ទំនិញក្នុងស្តុក',
    recentOrders: 'ការបញ្ជាទិញថ្មីៗ',
    orderId: 'លេខការបញ្ជាទិញ',
    customer: 'អតិថិជន',
    amount: 'ចំនួន',
    status: 'ស្ថានភាព',
    date: 'កាលបរិច្ឆេទ',
    lowStock: 'ស្តុកទាប',
    itemName: 'ឈ្មោះទំនិញ',
    currentStock: 'ស្តុកបច្ចុប្បន្ន',
    minimumLevel: 'កម្រិតអប្បបរមា',
    action: 'សកម្មភាព',
    restock: 'បំពេញស្តុក',
    viewAll: 'មើលទាំងអស់',
    quickActions: 'សកម្មភាពរហាស',
    addProduct: 'បន្ថែមផលិតផល',
    addCustomer: 'បន្ថែមអតិថិជន',
    generateReport: 'បង្កើតរបាយការណ៍',
    manageInventory: 'គ្រប់គ្រងស្តុក',
    expiringSoon: 'ជិតផុតកំណត់',
    within60Days: 'ក្នុងរយៈពេល ៦០ថ្ងៃ',
    operationalSnapshot: 'រូបភាពប្រតិបត្តិការនៃវេជ្ជបញ្ជា ស្តុក និងចំណូល',
    
    // Inventory
    inventoryManagement: 'គ្រប់គ្រងស្តុក',
    trackStockLevels: 'តាមដានកម្រិតស្តុក និងគ្រប់គ្រងស្តុក',
    addItem: 'បន្ថែមទំនិញ',
    searchItems: 'ស្វែងរកទំនិញ...',
    allItems: 'ទំនិញទាំងអស់',
    bulkActions: 'សកម្មភាពច្រើន',
    selectAll: 'ជ្រើសរើសទាំងអស់',
    deleteSelected: 'លុបដែលបានជ្រើសរើស',
    exportSelected: 'នាំចេញដែលបានជ្រើសរើស',
    itemId: 'លេខទំនិញ',
    
    // Products
    productManagement: 'គ្រប់គ្រងផលិតផល',
    manageProducts: 'គ្រប់គ្រងកាតាឡុកផលិតផលរបស់អ្នក',
    searchProducts: 'ស្វែងរកផលិតផល...',
    allProducts: 'ផលិតផលទាំងអស់',
    productName: 'ឈ្មោះផលិតផល',
    sku: 'SKU',
    price: 'តម្លៃ',
    
    // Customers
    customerManagement: 'គ្រប់គ្រងអតិថិជន',
    manageCustomers: 'គ្រប់គ្រងព័ត៌មានអតិថិជន និងការបញ្ជាទិញ',
    searchCustomers: 'ស្វែងរកអតិថិជន...',
    allCustomers: 'អតិថិជនទាំងអស់',
    customerName: 'ឈ្មោះអតិថិជន',
    email: 'អ៊ីមែល',
    phone: 'ទូរស័ព្ទ',
    orders: 'ការបញ្ជាទិញ',
    totalSpent: 'ចំណាយសរុប',
    lastOrder: 'ការបញ្ជាទិញចុងក្រោយ',
    viewDetails: 'មើលលម្អិត',
    contact: 'ទំនាក់ទំនង',
    noCustomersFound: 'រកមិនឃើញអតិថិជន',
    
    // Suppliers
    supplierManagement: 'គ្រប់គ្រងអ្នកផ្គត់ផ្គង់',
    manageSuppliers: 'គ្រប់គ្រងព័ត៌មានអ្នកផ្គត់ផ្គង់ និងកិច្ចសន្យា',
    addSupplier: 'បន្ថែមអ្នកផ្គត់ផ្គង់',
    searchSuppliers: 'ស្វែងរកអ្នកផ្គត់ផ្គង់...',
    allSuppliers: 'អ្នកផ្គត់ផ្គង់ទាំងអស់',
    supplierName: 'ឈ្មោះអ្នកផ្គត់ផ្គង់',
    company: 'ក្រុមហ៊ុន',
    address: 'អាសយដ្ឋាន',
    contractDate: 'កាលបរិច្ឆេទកិច្ចសន្យា',
    paymentTerms: 'លក្ខខណ្ឌបង់ប្រាក់',
    noSuppliersFound: 'រកមិនឃើញអ្នកផ្គត់ផ្គង់',
    rating: 'ការវាយតម្លៃ',
    
    // Sales
    salesManagement: 'គ្រប់គ្រងការលក់',
    manageSales: 'តាមដានប្រសិទ្ធភាពការលក់ និងប្រតិបត្តិការ',
    totalSales: 'ការលក់សរុប',
    todaySales: 'ការលក់ថ្ងៃនេះ',
    monthlySales: 'ការលក់ប្រចាំខែ',
    weeklySales: 'ការលក់ប្រចាំសប្តាហ៍',
    salesTarget: 'គោលដៅការលក់',
    achievement: 'សមិទ្ធផល',
    topProducts: 'ផលិតផលពេញនិយម',
    recentTransactions: 'ប្រតិបត្តិការថ្មីៗ',
    transactionId: 'លេខប្រតិបត្តិការ',
    totalrevenue: 'ចំណូលសរុប',
    totalprofit: 'ប្រាក់ចំណេញសរុប',
    totalcost: 'ថ្លៃដើមសរុប',
    avgordervalue: 'តម្លៃបញ្ជាទិញជាមធ្យម',
    sincelastweek: 'តាំងពីសប្តាហ៍មុន',
    ordersByTime: 'ការបញ្ជាទិញតាមពេលវេលា',
    mon: 'ច',
    tue: 'អ',
    wed: 'ព',
    thu: 'ព្រ',
    fri: 'សុ',
    sat: 'ស',
    sun: 'អា',
    less: 'តិច',
    more: 'ច្រើន',
    recentOrder: 'ការបញ្ជាទិញថ្មីៗ',
    medicineName: 'ឈ្មោះថ្នាំ',
    orderStatus: 'ស្ថានភាពការបញ្ជាទិញ',
    paymentStatus: 'ស្ថានភាពបង់ប្រាក់',
    sold: 'បានលក់',
    dispensingAnalytics: 'ការវិភាគការចែកចាយ',
    monthlyPrescriptionsDispensed: 'វេជ្ជបញ្ជាដែលបានចែកចាយប្រចាំខែ',
    topSellingMedicines: 'ថ្នាំលក់ច្រើនបំផុត',
    stockAlerts: 'ការជូនដំណឹងស្តុក',
    criticalAndExpiring: 'សំខាន់ និងជិតផុតកំណត់',
    qty: 'បរិមាណ',
    latestPrescriptions: 'វេជ្ជបញ្ជាថ្មីៗ',
    viewDetails: 'មើលលម្អិត',
    moreOptions: 'ជម្រើសបន្ថែម',
    
    // Forms
    add: 'បន្ថែម',
    update: 'ធ្វើបច្ចុប្បន្នភាព',
    search: 'ស្វែងរក',
    filter: 'តម្រង',
    export: 'នាំចេញ',
    import: 'នាំចូល',
    
    // Status
    active: 'សកម្ម',
    inactive: 'មិនសកម្ម',
    pending: 'កំពុងរង់ចាំ',
    completed: 'បានបញ្ចប់',
    cancelled: 'បានលុបចោល',
    
    // Reports
    financialOperationalInsights: 'ព័ត៌មានហិរញ្ញវត្ថុ និងប្រតិបត្តិការ',
    thisMonth: 'ខែនេះ',
    lastMonth: 'ខែមុន',
    thisYear: 'ឆ្នាំនេះ',
    advanced: 'កម្រិតខ្ពស់',
    exportCsv: 'នាំចេញ CSV',
    categoryContribution: 'ការរួមចំណែកតាមប្រភេទ',
    antibiotics: 'អង់ទីប៊ីយ៉ូទិក',
    analgesics: 'ថ្នាំបន្ថយឈឺ',
    vitamins: 'វីតាមីន',
    dermatology: 'ថ្នាំស្បែក',
    metric: 'វិធីសាស្ត្រ',
    value: 'តម្លៃ',
    delta: 'ប្រែប្រួល',
    errorOccurred: 'មានបញ្ហាកើតឡើង',
    pleaseTryAgain: 'សូមព្យាយាមម្តងទៀត',
    
    // Validation
    required: 'វាលនេះចាំបាច់',
    invalidEmail: 'សូមបញ្ចូលអាសយដ្ឋាន email ត្រឹមត្រូវ',
    passwordMismatch: 'ពាក្យសម្ងាត់មិនដូចគ្នា',
    minLength: 'ប្រវែងអប្បបរមា {min} តួអក្សរ',
    maxLength: 'ប្រវែងអតិបរមា {max} តួអក្សរ',

    // Login
    loginWelcomeBack: 'សូមស្វាគមន៍ការត្រលប់មកវិញ',
    loginSubtitle: 'ចូលដើម្បីគ្រប់គ្រងស្តុក ការលក់ និងរបាយការណ៍នៅក្នុងផ្ទាំងគ្រប់គ្រងឱសថស្ថានរបស់អ្នក។',
    loginSignIn: 'ចូល',
    loginEnterCredentials: 'បញ្ចូលព័ត៌មានសម្ងាត់ដើម្បីចូលគណនីរបស់អ្នក',
    loginEmail: 'អ៊ីមែល',
    loginPassword: 'ពាក្យសម្ងាត់',
    loginShow: 'បង្ហាញ',
    loginHide: 'លាក់',
    loginRememberMe: 'ចងចាំខ្ញុំ',
    loginForgotPassword: 'ភ្លេចពាក្យសម្ងាត់?',
    loginSignInButton: 'ចូល',
    loginAgreeTerms: 'ដោយចូល អ្នកយល់ព្រមនឹងលក្ខខណ្ឌ និងគោលការណ៍ឯកជនរបស់យើង។',
    loginDontHaveAccount: 'មិនមានគណនីទេ?',
    loginCreateOne: 'បង្កើតមួយ',
    
    // Wholesale
    wholesale: 'លក់ដុំ',
    quickOrder: 'បញ្ជាទិញរហ័ស',
    priceLists: 'តារាងតម្លៃ',
    createOrder: 'បង្កើតបញ្ជាទិញ',
    customerSearchPlaceholder: 'ស្វែងរកអតិថិជន ឬបង្កើតថ្មី...',
    addItemBySku: 'បន្ថែមទំនិញតាម SKU ឬស្កេនបាកូដ',
    unitPrice: 'តម្លៃឯកតា',
    quantity: 'បរិមាណ',
    subtotal: 'សរុបរង',
    discount: 'បញ្ចុះតម្លៃ',
    total: 'សរុប',
    finalizeOrder: 'បញ្ចប់បញ្ជាទិញ',
    newPriceList: 'បង្កើតតារាងតម្លៃថ្មី',
    listName: 'ឈ្មោះតារាង',
    effectiveFrom: 'មានប្រសិទ្ធិភាពពី',
    effectiveTo: 'ដល់',
    appliesTo: 'អនុវត្តចំពោះ',
    saveList: 'រក្សាទុកតារាង',

    // POS (Front cashier)
    pos: 'POS',
    scanOrSearch: 'ស្កេនបាកូដ ឬស្វែងរកផលិតផល...',
    cart: 'រទេះទំនិញ',
    checkout: 'គិតលុយ',
    clearCart: 'សម្អាតរទេះ',
    payCash: 'បង់សាច់ប្រាក់',
    discountPercent: 'បញ្ចុះតម្លៃ (%)',
    received: 'ប្រាក់ដែលទទួល',
    changeDue: 'ប្រាក់អាប់',
  }
}

// Helper function to get translation
export const t = (key, lang = 'en', params = {}) => {
  const translation = translations[lang]?.[key] || translations['en']?.[key] || key
  
  // Replace parameters in translation
  return translation.replace(/\{(\w+)\}/g, (match, param) => params[param] || match)
}
