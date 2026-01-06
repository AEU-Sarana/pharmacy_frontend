import React from 'react'
import { useLanguage, t } from '../../../contexts/LanguageContext'

const PriceLists = () => {
  const { language } = useLanguage()
  const lists = [
    { name: 'Default Wholesale', effectiveFrom: '2025-01-01', effectiveTo: '—', appliesTo: 'All customers' },
    { name: 'VIP Pharmacies', effectiveFrom: '2025-05-01', effectiveTo: '2025-12-31', appliesTo: 'VIP segment' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('priceLists', language)}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t('manageProducts', language)}</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-[#0f4c3a] text-white hover:brightness-110">{t('newPriceList', language)}</button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('listName', language)}</th>
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('effectiveFrom', language)}</th>
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('effectiveTo', language)}</th>
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('appliesTo', language)}</th>
              <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('action', language)}</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((l, i) => (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-700">
                <td className="px-2 py-3 text-sm font-semibold">{l.name}</td>
                <td className="px-2 py-3 text-sm">{l.effectiveFrom}</td>
                <td className="px-2 py-3 text-sm">{l.effectiveTo}</td>
                <td className="px-2 py-3 text-sm">{l.appliesTo}</td>
                <td className="px-2 py-3 text-sm"><button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600">{t('edit', language)}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PriceLists


