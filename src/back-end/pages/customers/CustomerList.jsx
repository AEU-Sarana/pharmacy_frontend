import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, Filter, Mail, Phone, UserCircle2, ArrowUpDown, CheckCircle2, XCircle } from 'lucide-react'
import { useLanguage, t } from '../../../contexts/LanguageContext'

const seedCustomers = [
  { id: 'CUS-0001', name: 'Mariana Nunes', email: 'mariana@example.com', phone: '+855 88 111 2222', orders: 12, total: 920.5, status: 'Active' },
  { id: 'CUS-0002', name: 'Christopher Adams', email: 'chris@example.com', phone: '+855 88 333 4444', orders: 3, total: 120.0, status: 'Inactive' },
  { id: 'CUS-0003', name: 'Alexander Pierce', email: 'alex@example.com', phone: '+855 88 555 6666', orders: 22, total: 2190.0, status: 'Active' },
  { id: 'CUS-0004', name: 'Sophia Lee', email: 'sophia@example.com', phone: '+855 88 777 8888', orders: 7, total: 430.25, status: 'Active' },
  { id: 'CUS-0005', name: 'Daniel Kim', email: 'daniel@example.com', phone: '+855 88 999 0000', orders: 0, total: 0, status: 'Inactive' },
]

const statusBadge = (status) => status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'

const CustomerList = () => {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [sortByOrdersAsc, setSortByOrdersAsc] = useState(false)
  const [customers, setCustomers] = useState(seedCustomers)
  const [selected, setSelected] = useState(() => new Set())
  const { language } = useLanguage()

  useEffect(() => { setMounted(true) }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    let data = customers.filter((c) => [c.name, c.email, c.phone, c.id].some((f) => f.toLowerCase().includes(q)))
    if (status !== 'all') data = data.filter((c) => (status === 'active' ? c.status === 'Active' : c.status === 'Inactive'))
    data = [...data].sort((a, b) => sortByOrdersAsc ? a.orders - b.orders : b.orders - a.orders)
    return data
  }, [customers, query, status, sortByOrdersAsc])

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map((c) => c.id)))
  }
  const bulkDeactivate = () => {
    if (!selected.size) return
    setCustomers((prev) => prev.map((c) => selected.has(c.id) ? { ...c, status: 'Inactive' } : c))
    setSelected(new Set())
  }
  const bulkDelete = () => {
    if (!selected.size) return
    setCustomers((prev) => prev.filter((c) => !selected.has(c.id)))
    setSelected(new Set())
  }

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? 'opacity-100' : 'opacity-0'} `}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight ${mounted ? 'opacity-100' : 'opacity-0'}`}>{t('customerManagement', language)}</h1>
              <p className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 ${mounted ? 'opacity-100' : 'opacity-0'}`}>{t('manageCustomers', language)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#0f4c3a] text-white text-sm font-semibold hover:brightness-110">
                <Plus className="w-4 h-4" />
                {t('addCustomer', language)}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-4 shadow-sm ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('searchCustomers', language)} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]" />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]">
                    <option value="all">{t('allCustomers', language)}</option>
                    <option value="active">{t('active', language)}</option>
                    <option value="inactive">{t('inactive', language)}</option>
                  </select>
                  <Filter className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                </div>
                <button onClick={() => setSortByOrdersAsc((s) => !s)} className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-600"><ArrowUpDown className="w-4 h-4" /> {t('sort', language)} {t('orders', language)}</button>
              </div>
            </div>
          </div>

          {/* Bulk actions */}
          <div className={`flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div>{selected.size > 0 ? <span className="font-medium">{selected.size}</span> : 0} {t('selected', language)}</div>
            <div className="flex items-center gap-2">
              <button onClick={bulkDeactivate} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">{t('deactivate', language)}</button>
              <button onClick={bulkDelete} className="px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">{t('delete', language)}</button>
            </div>
          </div>

          {/* Table */}
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <th className="text-left px-3 py-3 w-10"><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded border-gray-300 dark:border-gray-500 text-[#0f4c3a] focus:ring-[#0f4c3a] dark:bg-gray-700" /></th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('customerName', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('contact', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">{t('orders', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('totalSpent', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('status', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('action', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, idx) => (
                    <tr key={c.id} className={`border-b last:border-b-0 dark:border-gray-700 ${idx % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-800'} ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                      <td className="px-3 py-3"><input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleSelect(c.id)} className="rounded border-gray-300 dark:border-gray-500 text-[#0f4c3a] focus:ring-[#0f4c3a] dark:bg-gray-700" /></td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center"><UserCircle2 className="w-5 h-5 text-gray-400 dark:text-gray-300" /></div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{c.name}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">{c.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                          <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4 text-gray-400 dark:text-gray-400" /> {c.email}</span>
                          <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4 text-gray-400 dark:text-gray-400" /> {c.phone}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{c.orders}</td>
                      <td className="px-2 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">${'{'}c.total.toFixed(2){'}'}</td>
                      <td className="px-2 py-3"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-semibold ${statusBadge(c.status)}`}>{c.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {c.status === 'Active' ? t('active', language) : t('inactive', language)}</span></td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <button className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">{t('view', language)}</button>
                          <button className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">{t('edit', language)}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">{t('noCustomersFound', language)}</td>
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

export default CustomerList
