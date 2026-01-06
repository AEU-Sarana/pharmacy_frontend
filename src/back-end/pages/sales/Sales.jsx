import React, { useEffect, useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { useLanguage, t } from '../../../contexts/LanguageContext'

const stats = [
  { title: 'Total Revenue', value: '$112,200', delta: '+4.2%', positive: true, icon: DollarSign },
  { title: 'Total Profit', value: '$12,500', delta: '+2.1%', positive: true, icon: TrendingUp },
  { title: 'Total Cost', value: '$48,200', delta: '-3.6%', positive: false, icon: TrendingDown },
  { title: 'Avg. Order Value', value: '$96.50', delta: '+5.5%', positive: true, icon: TrendingUp },
]

const revenueSeries = [12, 18, 14, 16, 22, 12, 26, 14, 10, 18, 12, 20]
const lineChartData = [
  { date: 'Jun 10', value1: 45, value2: 35 },
  { date: 'Jun 11', value1: 52, value2: 38 },
  { date: 'Jun 12', value1: 48, value2: 32 },
  { date: 'Jun 13', value1: 58, value2: 28 },
  { date: 'Jun 14', value1: 55, value2: 42 }
]

const ordersHeatmap = [
  [0,0,0,0,0,0,0], // Monday - no activity
  [0,2,3,2,0,0,0], // Tuesday - moderate activity
  [1,3,4,3,1,0,0], // Wednesday - high activity
  [0,4,5,5,4,0,0], // Thursday - peak activity
  [0,2,3,2,0,0,0], // Friday - moderate activity
]

const recentOrders = [
  { id: 'ORD-05176', name: 'Paracetamol (2)\nIbuprofen (2)', price: '$25.50', status: 'Paid', payment: 'Completed' },
  { id: 'ORD-05175', name: 'Amoxicillin (3)\nCetirizine (1)', price: '$43.00', status: 'Pending', payment: 'In-progress' },
  { id: 'ORD-05174', name: 'Loratadine (2)\nOmeprazole (3)', price: '$63.20', status: 'Paid', payment: 'Pending' },
  { id: 'ORD-05173', name: 'Aspirin (4), Hydrocodone (1)', price: '$81.60', status: 'Paid', payment: 'Completed' },
]

const topProducts = [
  { name: 'Aspirin (Paracetamol)', sales: '$784', color: 'bg-[#0f4c3a]' },
  { name: 'Omeprazole', sales: '$738', color: 'bg-[#f97316]' },
  { name: 'Ibuprofen', sales: '$702', color: 'bg-[#2563eb]' },
  { name: 'Cetirizine', sales: '$655', color: 'bg-[#ef4444]' },
  { name: 'Loratadine', sales: '$610', color: 'bg-gray-400' },
]

const Sales = () => {
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  useEffect(() => setMounted(true), [])

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t(s.title.toLowerCase().replace(/\s+/g, ''), language)}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{s.value}</p>
                    <span className={`mt-2 inline-flex items-center text-xs font-semibold px-2 py-1 rounded-lg ${s.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.delta} <span className="ml-1 text-gray-500 dark:text-gray-400 font-normal">{t('sincelastweek', language)}</span></span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"><Icon className="w-5 h-5 text-[#0f4c3a] dark:text-green-400" /></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Middle: revenue + heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('totalrevenue', language)}</h2>
              <div className="flex items-center gap-4">
                {/* Legend */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-0.5 bg-orange-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t('revenue', language)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-0.5 bg-purple-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{t('profit', language)}</span>
                  </div>
                </div>
                <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm"><option>{t('thisMonth', language)}</option></select>
              </div>
            </div>
            {/* Line Chart with grid lines */}
            <div className="relative h-56">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 dark:text-gray-500 pr-2">
                {['60', '50', '40', '30', '20', '10', '0'].map((label, i) => (
                  <span key={i} className="leading-none">{label}</span>
                ))}
              </div>
              
              {/* Y-axis grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none ml-6">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="border-t border-gray-200 dark:border-gray-600" />
                ))}
              </div>
              
              {/* Chart area */}
              <div className="absolute inset-0 flex items-end justify-between px-2 ml-6">
                <div className="flex-1 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="border-t border-gray-200 dark:border-gray-600" />
                    ))}
                  </div>
                  
                  {/* Line chart */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Orange/Yellow line */}
                    <polyline
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="0.8"
                      points={lineChartData.map((d, i) => 
                        `${(i * 25)},${100 - (d.value1 * 1.67)}`
                      ).join(' ')}
                    />
                    {/* Purple line */}
                    <polyline
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="0.8"
                      points={lineChartData.map((d, i) => 
                        `${(i * 25)},${100 - (d.value2 * 1.67)}`
                      ).join(' ')}
                    />
                    
                    {/* Data points for orange line */}
                    {lineChartData.map((d, i) => (
                      <circle
                        key={`orange-${i}`}
                        cx={i * 25}
                        cy={100 - (d.value1 * 1.67)}
                        r="1.5"
                        fill="#f97316"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    ))}
                    
                    {/* Data points for purple line */}
                    {lineChartData.map((d, i) => (
                      <circle
                        key={`purple-${i}`}
                        cx={i * 25}
                        cy={100 - (d.value2 * 1.67)}
                        r="1.5"
                        fill="#8b5cf6"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    ))}
                  </svg>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 ml-6">
                {lineChartData.map((d, i) => (
                  <span key={i} className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                    {d.date}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 shadow-sm relative ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('ordersByTime', language)}</h2>
            </div>
            
            {/* Heatmap Container with Time Labels */}
            <div className="flex">
              {/* Time Labels */}
              <div className="flex flex-col h-30 text-[10px] text-gray-400 dark:text-gray-500 w-10 mr-2">
                <div className="h-7 flex items-center justify-end">12PM</div>
                <div className="h-7 flex items-center justify-end">9AM</div>
                <div className="h-7 flex items-center justify-end">6AM</div>
                <div className="h-7 flex items-center justify-end">3AM</div>
                <div className="h-7 flex items-center justify-end">12AM</div>
              </div>
              
              {/* Heatmap Grid */}
              <div className="grid grid-cols-7 gap-1 mb-3 flex-1">
              {ordersHeatmap.map((row, rIdx) => (
                row.map((val, cIdx) => {
                  // Color intensity based on value
                  let bgColor = 'bg-gray-200 dark:bg-gray-700' // Default for 0
                  if (val === 1) bgColor = 'bg-green-200 dark:bg-green-800'
                  else if (val === 2) bgColor = 'bg-green-300 dark:bg-green-700'
                  else if (val === 3) bgColor = 'bg-green-400 dark:bg-green-600'
                  else if (val === 4) bgColor = 'bg-green-500 dark:bg-green-500'
                  else if (val === 5) bgColor = 'bg-green-600 dark:bg-green-400'
                  
                  return (
                    <div 
                      key={`${rIdx}-${cIdx}`} 
                      className={`h-6 rounded-sm ${bgColor} transition-all duration-200 hover:scale-105`}
                      title={`${val} orders`}
                    />
                  )
                })
              ))}
              </div>
            </div>
            
            {/* Day Labels */}
            <div className="flex">
              <div className="w-10 mr-2"></div> {/* Spacer for time labels */}
              <div className="flex-1 flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                <span>{t('mon', language)}</span><span>{t('tue', language)}</span><span>{t('wed', language)}</span><span>{t('thu', language)}</span><span>{t('fri', language)}</span><span>{t('sat', language)}</span><span>{t('sun', language)}</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{t('less', language)}</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-800"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
                  <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-400"></div>
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{t('more', language)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: recent orders + top products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('recentOrder', language)}</h2>
              <button className="text-xs font-semibold text-[#0f4c3a] px-2 py-1 rounded-lg hover:bg-[#0f4c3a]/5">{t('viewAll', language)}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('orderId', language)}</th>
                    <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('medicineName', language)}</th>
                    <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('price', language)}</th>
                    <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('orderStatus', language)}</th>
                    <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('paymentStatus', language)}</th>
                    <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('action', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o, idx) => (
                    <tr key={o.id} className={`border-b dark:border-gray-600 ${idx % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-800'}`}>
                      <td className="px-2 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{o.id}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{o.name}</td>
                      <td className="px-2 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{o.price}</td>
                      <td className="px-2 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-semibold ${o.status === 'Paid' ? 'bg-green-100 text-green-700' : o.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{o.status}</span>
                      </td>
                      <td className="px-2 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-semibold ${o.payment === 'Completed' ? 'bg-green-100 text-green-700' : o.payment === 'In-progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{o.payment}</span>
                      </td>
                      <td className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400">...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 sm:p-6 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('topProducts', language)}</h2>
              <button className="text-xs font-semibold text-[#0f4c3a] px-2 py-1 rounded-lg hover:bg-[#0f4c3a]/5">{t('thisMonth', language)}</button>
            </div>
            <div className="space-y-3">
              {topProducts.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-8 rounded-full ${p.color}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">200 {t('sold', language)}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.sales}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sales
