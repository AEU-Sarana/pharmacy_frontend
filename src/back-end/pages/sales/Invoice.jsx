import React from 'react'
import { ArrowLeft, Printer, Send, CheckCircle2 } from 'lucide-react'

const Invoice = () => {
  const items = [
    { id: '1', name: 'Paracetamol 500mg', qty: 2, price: 3.5 },
    { id: '2', name: 'Amoxicillin 500mg', qty: 1, price: 7.2 },
    { id: '3', name: 'Omeprazole 20mg', qty: 1, price: 6.0 },
  ]
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"><ArrowLeft className="w-4 h-4" /></button>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">Invoice INV-2025-001</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Issued on Oct 7, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-700"><CheckCircle2 className="w-4 h-4" /> Paid</span>
            <button className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"><Printer className="w-4 h-4" /> Print</button>
            <button className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-[#0f4c3a] text-white hover:bg-[#0d3f31]"><Send className="w-4 h-4" /> Send</button>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 dark:border-gray-700 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">From</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">HealthPlus Pharmacy</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">123 Main St, Phnom Penh</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">(+855) 12 345 678</p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 dark:border-gray-700 rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Bill To</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No. 45, St 360, Phnom Penh</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">(+855) 98 765 432</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 dark:border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:bg-gray-900">
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-4 py-3">Item</th>
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-4 py-3">Qty</th>
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-4 py-3">Price</th>
                <th className="text-left text-xs font-semibold text-gray-600 dark:text-gray-300 px-4 py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{i.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{i.qty}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">${i.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">${(i.qty * i.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 px-4 py-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">Thank you for your business.</div>
            <div className="w-full sm:w-64 border border-gray-200 dark:border-gray-600 rounded-xl p-3 bg-white">
              <div className="flex items-center justify-between text-sm"><span className="text-gray-600 dark:text-gray-300">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-gray-600 dark:text-gray-300">Tax (10%)</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
              <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-gray-200 dark:border-gray-600"><span className="text-gray-900 dark:text-gray-100 font-semibold">Total</span><span className="font-bold text-gray-900 dark:text-gray-100">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
