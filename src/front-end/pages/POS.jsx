import React, { useMemo, useState } from 'react'
import { t, useLanguage } from '../../contexts/LanguageContext'

const demoProducts = [
  { id: 1, name: 'Paracetamol 500mg', barcode: '1234567890123', price: 1.2 },
  { id: 2, name: 'Ibuprofen 200mg', barcode: '9876543210987', price: 1.5 },
  { id: 3, name: 'Vitamin C 1000mg', barcode: '1112223334445', price: 2.0 },
]

const POS = () => {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState([])
  const [discount, setDiscount] = useState(0)
  const [received, setReceived] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return demoProducts.filter(p => p.name.toLowerCase().includes(q) || p.barcode.includes(q))
  }, [query])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setQuery('')
  }

  const updateQty = (id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Number(qty) || 0 } : i))
  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id))
  const clearCart = () => setCart([])

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const discountAmount = subtotal * (Number(discount) || 0) / 100
  const total = subtotal - discountAmount
  const change = (Number(received) || 0) - total

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-colors duration-300">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors duration-300">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('scanOrSearch', language)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
          {results.length > 0 && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {results.map(p => (
                <button key={p.id} onClick={() => addToCart(p)} className="text-left px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.barcode} • ${p.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors duration-300">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-semibold">{t('cart', language)}</div>
          <div className="p-4 overflow-x-auto transition-colors duration-300">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left text-xs px-2 py-2">{t('productName', language)}</th>
                  <th className="text-left text-xs px-2 py-2">{t('price', language)}</th>
                  <th className="text-left text-xs px-2 py-2">{t('quantity', language)}</th>
                  <th className="text-left text-xs px-2 py-2">{t('subtotal', language)}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="px-2 py-2 text-sm">{item.name}</td>
                    <td className="px-2 py-2 text-sm">${item.price.toFixed(2)}</td>
                    <td className="px-2 py-2 text-sm">
                      <input type="number" min="0" value={item.qty} onChange={e => updateQty(item.id, e.target.value)} className="w-20 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" />
                    </td>
                    <td className="px-2 py-2 text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</td>
                    <td className="px-2 py-2 text-right"><button onClick={() => removeItem(item.id)} className="text-red-600">×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <button onClick={clearCart} className="text-sm text-red-600">{t('clearCart', language)}</button>
            <div className="text-sm">{t('subtotal', language)}: <span className="font-semibold">${subtotal.toFixed(2)}</span></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between"><span>{t('subtotal', language)}</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
          <label className="flex items-center justify-between gap-3 text-sm">
            <span>{t('discountPercent', language)}</span>
            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="w-24 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" />
          </label>
          <div className="flex items-center justify-between"><span>{t('total', language)}</span><span className="text-xl font-semibold">${total.toFixed(2)}</span></div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
          <label className="flex items-center justify-between gap-3 text-sm">
            <span>{t('received', language)}</span>
            <input type="number" value={received} onChange={e => setReceived(e.target.value)} className="w-32 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900" />
          </label>
          <div className="flex items-center justify-between"><span>{t('changeDue', language)}</span><span className="text-lg font-semibold">${Math.max(0, change).toFixed(2)}</span></div>
          <button className="w-full px-4 py-3 rounded-lg bg-[#0f4c3a] text-white font-semibold hover:brightness-110">{t('payCash', language)}</button>
        </div>
      </div>
    </div>
  )
}

export default POS


