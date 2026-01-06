import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, CalendarClock, Package, AlertTriangle, Check, Plus, ArrowUpDown } from 'lucide-react'
import { useLanguage, t } from '../../../contexts/LanguageContext'

const seedItems = [
  { id: 'INV-0001', name: 'Paracetamol 500mg', sku: 'PARA-500', category: 'Analgesic', stock: 240, min: 100, expiry: '2026-01-15' },
  { id: 'INV-0002', name: 'Amoxicillin 500mg', sku: 'AMOX-500', category: 'Antibiotic', stock: 92, min: 80, expiry: '2025-12-01' },
  { id: 'INV-0003', name: 'Ibuprofen 200mg', sku: 'IBU-200', category: 'NSAID', stock: 18, min: 60, expiry: '2025-11-02' },
  { id: 'INV-0004', name: 'Omeprazole 20mg', sku: 'OME-20', category: 'PPI', stock: 0, min: 40, expiry: '2025-10-18' },
]

const statusInfo = (item) => {
  if (item.stock === 0) return { labelKey: 'outOfStock', cls: 'bg-red-100 text-red-700' }
  if (item.stock < item.min) return { labelKey: 'low', cls: 'bg-yellow-100 text-yellow-700' }
  return { labelKey: 'ok', cls: 'bg-green-100 text-green-700' }
}

const Inventory = () => {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [view, setView] = useState('all') // all | low | expiring
  const [sortAsc, setSortAsc] = useState(true)
  const [items, setItems] = useState(seedItems)
  const [selected, setSelected] = useState(() => new Set())
  const { language } = useLanguage()

  useEffect(() => { setMounted(true) }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    const now = new Date()
    let data = items.filter((i) => [i.name, i.sku, i.category, i.id].some((f) => f.toLowerCase().includes(q)))
    if (view === 'low') data = data.filter((i) => i.stock === 0 || i.stock < i.min)
    if (view === 'expiring') data = data.filter((i) => (new Date(i.expiry) - now) / (1000*60*60*24) <= 60)
    return data.sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
  }, [items, query, view, sortAsc])

  const toggleSelect = (id) => setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleAll = () => selected.size === filtered.length ? setSelected(new Set()) : setSelected(new Set(filtered.map((i) => i.id)))

  const bulkMarkOk = () => { if (!selected.size) return; setItems((prev) => prev.map((i) => selected.has(i.id) ? { ...i, min: Math.max(0, i.stock - 1) } : i)); setSelected(new Set()) }

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? 'opacity-100' : 'opacity-0'} `}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight ${mounted ? 'opacity-100' : 'opacity-0'}`}>{t('inventoryManagement', language)}</h1>
              <p className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 ${mounted ? 'opacity-100' : 'opacity-0'}`}>{t('trackStockLevels', language)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/admin/inventory/add')}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#0f4c3a] text-white text-sm font-semibold hover:brightness-110"
              >
                <Plus className="w-4 h-4" /> {t('addItem', language)}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-4 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchItems', language)} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]" />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={view} onChange={(e) => setView(e.target.value)} className="pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]">
                    <option value="all">{t('allItems', language)}</option>
                    <option value="low">{t('lowStock', language)}</option>
                    <option value="expiring">{t('expiringSoon', language)} ≤ 60d</option>
                  </select>
                  <Filter className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                </div>
                <button onClick={() => setSortAsc((s) => !s)} className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700"><ArrowUpDown className="w-4 h-4" /> {t('sort', language)}</button>
              </div>
            </div>
          </div>

          {/* Bulk actions */}
          <div className={`flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div>{selected.size > 0 ? <span className="font-medium">{selected.size}</span> : 0} {t('selected', language)}</div>
            <div className="flex items-center gap-2">
              <button onClick={bulkMarkOk} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"><Check className="w-4 h-4 inline mr-1" /> {t('markOk', language)}</button>
            </div>
          </div>

          {/* Table */}
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/20">
                    <th className="text-left px-3 py-3 w-10"><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('itemName', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('category', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">SKU</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('stock', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('minimum', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('expiryDate', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('status', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('action', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it, idx) => {
                    const info = statusInfo(it)
                    const days = Math.round((new Date(it.expiry) - new Date()) / (1000*60*60*24))
                    return (
                      <tr key={it.id} className={`border-b border-gray-100 dark:border-gray-700 ${idx % 2 === 1 ? 'bg-gray-50/40 dark:bg-gray-700/20' : 'bg-white dark:bg-gray-800'} ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                        <td className="px-3 py-3"><input type="checkbox" checked={selected.has(it.id)} onChange={() => toggleSelect(it.id)} /></td>
                        <td className="px-2 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center"><Package className="w-5 h-5 text-gray-400" /></div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{it.name}</p>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400">{it.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{it.category}</td>
                        <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{it.sku}</td>
                        <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{it.stock}</td>
                        <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{it.min}</td>
                        <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300 inline-flex items-center gap-1"><CalendarClock className="w-4 h-4 text-gray-400" /> {it.expiry} <span className="text-[10px] text-gray-500 dark:text-gray-400">({days}d)</span></td>
                        <td className="px-2 py-3"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-semibold ${info.cls}`}>{info.labelKey === 'ok' ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />} {t(info.labelKey, language)}</span></td>
                        <td className="px-2 py-3">
                          <button 
                            onClick={() => navigate(`/admin/inventory/edit/${it.id}`)}
                            className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            {t('adjust', language)}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">No inventory found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory



