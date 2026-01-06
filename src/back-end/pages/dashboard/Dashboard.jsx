import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package2, Pill, Activity, CalendarClock, AlertTriangle } from "lucide-react"
import { useEffect, useMemo, useState, useRef } from "react"
import { dashboardApi } from "../../services/api"
import { StatsCard } from "../../../components/StatsCard"
import { useLanguage, t } from "../../../contexts/LanguageContext"

const Dashboard = () => {
  // Local UI state for backend integration
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()

  const [stats, setStats] = useState([
    {
      titleKey: "revenue",
      value: "$12,500",
      change: "+12.5%",
      trend: "up",
      subtitleKey: "sinceLastWeek",
      icon: DollarSign,
      isPrimary: false,
    },
    {
      titleKey: "prescriptions",
      value: "1,020",
      change: "+3.1%",
      trend: "up",
      subtitleKey: "dispensedThisMonth",
      icon: Pill,
      isPrimary: false,
    },
    {
      titleKey: "inventory",
      value: "2,549",
      change: "+8.2%",
      trend: "up",
      subtitleKey: "itemsInStock",
      icon: Package2,
      isPrimary: false,
    },
    {
      titleKey: "expiringSoon",
      value: "37",
      change: "+5.4%",
      trend: "up",
      subtitleKey: "within60Days",
      icon: CalendarClock,
      isPrimary: false,
    },
  ])

  const [salesData, setSalesData] = useState([
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 38 },
    { month: "Apr", value: 65 },
    { month: "May", value: 58 },
    { month: "Jun", value: 80 },
    { month: "Jul", value: 95 },
    { month: "Aug", value: 62 },
    { month: "Sep", value: 48 },
    { month: "Oct", value: 70 },
    { month: "Nov", value: 55 },
    { month: "Dec", value: 42 },
  ])

  const [stockAlerts, setStockAlerts] = useState([
    { name: "Metformin 500mg", status: "Low stock", qty: 14, color: "bg-red-100 text-red-700", icon: AlertTriangle },
    { name: "Lisinopril 10mg", status: "Expiring 30d", qty: 92, color: "bg-yellow-100 text-yellow-700", icon: CalendarClock },
    { name: "Omeprazole 20mg", status: "Low stock", qty: 22, color: "bg-red-100 text-red-700", icon: AlertTriangle },
    { name: "Atorvastatin 20mg", status: "Expiring 45d", qty: 60, color: "bg-yellow-100 text-yellow-700", icon: CalendarClock },
  ])

  const [latestOrders, setLatestOrders] = useState([
    { id: "ORD-001", customer: "Mariana Nunes", price: "$250", status: "Pending", date: "Feb 15, 2025" },
    { id: "ORD-002", customer: "Christopher", price: "$180", status: "Completed", date: "Feb 15, 2025" },
    { id: "ORD-003", customer: "Alexander", price: "$420", status: "Pending", date: "Feb 14, 2025" },
    { id: "ORD-004", customer: "Christopher", price: "$175", status: "Cancelled", date: "Feb 14, 2025" },
  ])

  const [topMedicines, setTopMedicines] = useState([
    {
      name: "Paracetamol",
      sales: "$3,200",
      amount: "$3,200",
      percentage: 85,
      color: "bg-gradient-to-b from-orange-400 to-orange-600",
    },
    {
      name: "Amoxicillin",
      sales: "$2,800",
      amount: "$2,800",
      percentage: 95,
      color: "bg-gradient-to-b from-[#7ed957] to-[#5eb83a]",
    },
    {
      name: "Ibuprofen",
      sales: "$2,400",
      amount: "$2,400",
      percentage: 70,
      color: "bg-gradient-to-b from-orange-400 to-orange-600",
    },
  ])

  const iconMap = useMemo(() => ({
    dollar: DollarSign,
    pill: Pill,
    package: Package2,
    calendar: CalendarClock,
    cart: ShoppingCart,
    activity: Activity,
  }), [])

  useEffect(() => {
    // Trigger enter animations on mount
    setMounted(true)
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        setError("")
        const [statsRes, salesRes, topsRes, alertsRes, ordersRes] = await Promise.all([
          dashboardApi.getStats().catch(() => null),
          dashboardApi.getSales().catch(() => null),
          dashboardApi.getTopMedicines().catch(() => null),
          dashboardApi.getStockAlerts().catch(() => null),
          dashboardApi.getLatestOrders().catch(() => null),
        ])

        if (!mounted) return

        if (Array.isArray(statsRes) && statsRes.length) {
          setStats(statsRes.map((s, idx) => ({
            ...s,
            icon: iconMap[s.iconKey] || (idx === 0 ? DollarSign : Package2),
            isPrimary: false,
          })))
        }
        if (Array.isArray(salesRes) && salesRes.length) setSalesData(salesRes)
        if (Array.isArray(topsRes) && topsRes.length) setTopMedicines(topsRes)
        if (Array.isArray(alertsRes) && alertsRes.length) {
          setStockAlerts(alertsRes.map((a) => ({
            ...a,
            icon: a.type === "expiring" ? CalendarClock : AlertTriangle,
            color: a.type === "expiring" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700",
          })))
        }
        if (Array.isArray(ordersRes) && ordersRes.length) setLatestOrders(ordersRes)
      } catch (e) {
        setError(e?.message || "Failed to load dashboard")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [iconMap])


  // Simplified stats - no complex animations for better performance
  const statAnimatedValues = stats.map((s) => s.value)

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 overflow-auto ${mounted ? "opacity-100" : "opacity-0"} `}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight  ${mounted ? "opacity-100 " : "opacity-0 "}`}>{t('dashboard', language)}</h1>
              <p className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1   ${mounted ? "opacity-100 " : "opacity-0 "}`}>{t('operationalSnapshot', language)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.titleKey}
                  className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-[#0f4c3a]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm  ${mounted ? "opacity-100 " : "opacity-0 "}`}
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div
                      className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0f4c3a] dark:text-green-400" />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg ${
                        stat.trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                <div>
                    <p
                      className="text-[11px] sm:text-xs font-medium mb-1 sm:mb-2 text-gray-500 dark:text-gray-400"
                    >
                      {t(stat.titleKey, language)}
                    </p>
                    <p
                      className="text-2xl sm:text-4xl font-semibold leading-tight mb-1 text-gray-900 dark:text-gray-100"
                    >
                      {statAnimatedValues[stats.findIndex((s) => s.titleKey === stat.titleKey)] || stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">{t(stat.subtitleKey, language)}</p>
                  </div>
                </div>
              )
            })}
          </div>
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-white border border-gray-200 shadow-sm animate-pulse">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="p-3 rounded-xl bg-gray-100 w-10 h-10" />
                    <div className="h-6 w-16 bg-gray-100 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                    <div className="h-6 w-28 bg-gray-100 rounded" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className={`lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm  ${mounted ? "opacity-100 " : "opacity-0 "}`} >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-8">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">{t('dispensingAnalytics', language)}</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{t('monthlyPrescriptionsDispensed', language)}</p>
                </div>
                <select className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full sm:w-auto">
                  <option>{t('thisMonth', language)}</option>
                  <option>{t('lastMonth', language)}</option>
                  <option>{t('thisYear', language)}</option>
                </select>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="min-w-[500px] sm:min-w-0">
                  {/* Chart with Y-axis labels */}
                  <div className="flex gap-2 sm:gap-3">
                    {/* Y-axis (ticks) */}
                    <div className="hidden sm:flex flex-col justify-between text-[10px] text-gray-400 dark:text-gray-500 w-8 select-none">
                      {['4k','3.5k','3k','2.5k','2k','1.5k','1k'].map((t) => (
                        <span key={t} className="leading-none">{t}</span>
                      ))}
                    </div>
                    {/* Plot area */}
                    <div className="relative h-56 sm:h-80 lg:h-96 flex-1">
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="border-t border-gray-100" />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-end justify-between gap-2 sm:gap-3 px-2">
                    {loading ? (
                      [...Array(12)].map((_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 sm:gap-3">
                          <div className="w-full flex items-end justify-center" style={{ height: "220px" }}>
                            <div className="w-full bg-gray-100 rounded-2xl shadow-sm" style={{ height: `${20 + (i % 5) * 10}px` }} />
                          </div>
                          <span className="text-[10px] sm:text-xs font-medium text-gray-300">---</span>
                        </div>
                      ))
                    ) : (
                    salesData.map((item, index) => (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-2 sm:gap-3">
                        <div className="w-full flex items-end justify-center" style={{ height: "220px" }}>
                          {/* Track + fill to mimic the provided design */}
                          <div className="relative w-8 sm:w-10 lg:w-12 max-w-full h-full flex items-end justify-center">
                            <div className="absolute inset-0 mx-auto w-2/3 bg-gray-100 dark:bg-gray-700 rounded-2xl" />
                            <div className="group relative mx-auto w-2/3 bg-[#22c55e] rounded-2xl transition-all duration-200 ease-out" style={{ height: mounted ? `${item.value}%` : "0%", minHeight: "18px", transitionDelay: `${100 + index * 60}ms` }}>
                              {/* Tooltip */}
                              <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -full opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="px-2 py-1 rounded-md bg-gray-800 text-white text-[10px] sm:text-xs font-semibold shadow">
                                  {item.value}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-600">{item.month}</span>
                      </div>
                    ))
                    )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm  ${mounted ? "opacity-100 " : "opacity-0 "}`} >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">{t('topSellingMedicines', language)}</h2>
                <div className="flex items-center gap-2">
                  <button className="text-xs sm:text-sm text-[#0f4c3a] font-semibold px-2 py-1 rounded-lg hover:bg-[#0f4c3a]/5 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/40 whitespace-nowrap">
                    {t('thisMonth', language)}
                  </button>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-24 bg-gray-100 rounded" />
                        <div className="h-4 w-16 bg-gray-100 rounded" />
                      </div>
                      <div className="relative h-10 sm:h-14 bg-gray-100 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gray-200" style={{ width: `${60 + i * 10}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                topMedicines.map((medicine, index) => (
                  <div key={medicine.name} className={`group  ${mounted ? "opacity-100 " : "opacity-0 "}`} style={{ transitionDelay: `${120 + index * 120}ms` }}>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">{medicine.name}</span>
                      <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-900 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm">
                        {medicine.amount}
                      </span>
                    </div>
                    <div className="relative h-10 sm:h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-inner">
                      <div
                        className={`absolute inset-y-0 left-0 ${medicine.color} rounded-2xl transition-all duration-200 ease-out shadow-md group-hover:brightness-105`}
                        style={{ width: mounted ? `${medicine.percentage}%` : "0%", transitionDelay: `${100 + index * 100}ms` }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                            {medicine.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="absolute right-3 sm:right-4 top-1/2 -/2">
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400">{medicine.sales}</span>
                      </div>
                    </div>
                  </div>
                ))
                )}
              </div>
              <div className="mt-6 sm:mt-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">{t('stockAlerts', language)}</h3>
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{t('criticalAndExpiring', language)}</span>
                </div>
                <div className="space-y-2">
                  {stockAlerts.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div key={item.name} className={`flex items-center justify-between bg-white/80 border border-gray-200 rounded-xl px-3 py-2 hover:shadow-sm transition-all duration-200 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} style={{ transitionDelay: `${100 + idx * 80}ms` }}>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                            <Icon className="w-4 h-4 text-[#0f4c3a]" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500">{t('qty', language)}: {item.qty}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] sm:text-xs font-semibold ${item.color}`}>
                          {item.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-sm  ${mounted ? "opacity-100 " : "opacity-0 "}`} >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">{t('latestPrescriptions', language)}</h2>
              <button className="text-xs sm:text-sm text-[#0f4c3a] font-semibold px-2 py-1 rounded-lg hover:bg-[#0f4c3a]/5 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/40 self-start sm:self-auto">
                {t('viewAll', language)}
              </button>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {t('orderId', language)}
                      </th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {t('customerName', language)}
                      </th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {t('price', language)}
                      </th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {t('status', language)}
                      </th>
                      <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {t('action', language)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(loading ? [...Array(4)] : latestOrders).map((order, idx) => (
                      <tr key={order?.id || idx} className={`border-b border-gray-100 dark:border-gray-700 transition-colors ${loading ? "" : "hover:bg-gray-50 dark:hover:bg-gray-700/40"} ${idx % 2 === 1 ? "bg-gray-50/40 dark:bg-gray-700/20" : "bg-white dark:bg-gray-800"}  ${mounted ? "opacity-100 " : "opacity-0 "}`} style={{ transitionDelay: `${100 + idx * 60}ms` }}>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                          {loading ? <span className="inline-block h-3 w-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" /> : order.id}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                          {loading ? <span className="inline-block h-3 w-28 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" /> : order.customer}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                          {loading ? <span className="inline-block h-3 w-12 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" /> : order.price}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 whitespace-nowrap">
                          {loading ? (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold bg-gray-100 text-gray-400 animate-pulse">---</span>
                          ) : (
                            <span
                              className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold ${
                                order.status === "Completed"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                  : order.status === "Pending"
                                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 sm:py-4 px-2 sm:px-4 whitespace-nowrap">
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <span className="inline-block h-6 w-6 bg-gray-100 rounded-lg animate-pulse" />
                              <span className="inline-block h-6 w-6 bg-gray-100 rounded-lg animate-pulse" />
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <button
                                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                title={t('viewDetails', language)}
                              >
                                <svg
                                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              <button
                                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                title={t('moreOptions', language)}
                              >
                                <svg
                                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
