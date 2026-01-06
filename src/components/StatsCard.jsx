import React, { memo } from 'react'

// Optimized stats card component to prevent unnecessary re-renders
export const StatsCard = memo(({ 
  title, 
  value, 
  change, 
  trend, 
  subtitle, 
  icon: Icon, 
  isPrimary = false,
  className = "",
  ...props 
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-[#0f4c3a]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm ${className}`}
      {...props}
    >
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0f4c3a] dark:text-green-400" />
        </div>
        <span className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg ${
          trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        }`}>
          {trend === "up" ? (
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{value}</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">{title}</p>
        <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
      </div>
    </div>
  )
})

StatsCard.displayName = 'StatsCard'
