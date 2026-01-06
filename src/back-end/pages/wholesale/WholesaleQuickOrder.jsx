import React, { useState } from 'react'
import { useLanguage, t } from '../../../contexts/LanguageContext'

const WholesaleQuickOrder = () => {
  const { language } = useLanguage()
  const [items, setItems] = useState([])

  const addEmptyRow = () => {
    setItems(prev => [...prev, { sku: '', name: '', price: 0, qty: 1 }])
  }

  const updateItem = (idx, field, value) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: value } : it))
  }

  const subtotal = items.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0), 0)

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{t('quickOrder', language)}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t('createOrder', language)}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <input
          placeholder={t('customerSearchPlaceholder', language)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg"
        />

        <div className="flex items-center gap-2">
          <input
            placeholder={t('addItemBySku', language)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg"
          />
          <button onClick={addEmptyRow} className="px-4 py-2 rounded-lg bg-[#0f4c3a] text-white hover:brightness-110">{t('add', language)}</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">SKU</th>
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('productName', language)}</th>
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('unitPrice', language)}</th>
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('quantity', language)}</th>
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-3">{t('subtotal', language)}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="px-2 py-2"><input value={it.sku} onChange={e => updateItem(idx, 'sku', e.target.value)} className="w-28 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded" /></td>
                  <td className="px-2 py-2"><input value={it.name} onChange={e => updateItem(idx, 'name', e.target.value)} className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded" /></td>
                  <td className="px-2 py-2"><input type="number" step="0.01" value={it.price} onChange={e => updateItem(idx, 'price', e.target.value)} className="w-28 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded" /></td>
                  <td className="px-2 py-2"><input type="number" value={it.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded" /></td>
                  <td className="px-2 py-2 text-sm font-semibold">${((Number(it.price)||0)*(Number(it.qty)||0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-6">
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-300">{t('subtotal', language)}: <span className="font-semibold text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span></div>
          </div>
          <button className="px-5 py-2 rounded-lg bg-[#0f4c3a] text-white hover:brightness-110">{t('finalizeOrder', language)}</button>
        </div>
      </div>
    </div>
  )
}

export default WholesaleQuickOrder


