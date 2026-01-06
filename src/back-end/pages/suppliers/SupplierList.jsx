import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Building2, Search, Filter, Phone, Mail, MapPin, Star, ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { useLanguage, t } from "../../../contexts/LanguageContext"

const initialSuppliers = [
  { 
    id: "SUP-0001", 
    name: "MedSupply Co", 
    contact: "John Smith", 
    email: "john@medsupply.com", 
    phone: "+1-555-0123", 
    address: "123 Medical St, Health City", 
    category: "Pharmaceutical", 
    rating: 4.5, 
    status: "Active",
    products: 45,
    lastOrder: "2025-01-15"
  },
  { 
    id: "SUP-0002", 
    name: "PharmaCorp", 
    contact: "Sarah Johnson", 
    email: "sarah@pharmacorp.com", 
    phone: "+1-555-0456", 
    address: "456 Drug Ave, Medicine Town", 
    category: "Medical Equipment", 
    rating: 4.2, 
    status: "Active",
    products: 32,
    lastOrder: "2025-01-10"
  },
  { 
    id: "SUP-0003", 
    name: "HealthPlus", 
    contact: "Mike Wilson", 
    email: "mike@healthplus.com", 
    phone: "+1-555-0789", 
    address: "789 Wellness Blvd, Care City", 
    category: "Supplies", 
    rating: 3.8, 
    status: "Inactive",
    products: 18,
    lastOrder: "2024-12-20"
  },
]

const statusBadge = (status) => {
  return status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
}

const SupplierList = () => {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [category, setCategory] = useState("all")
  const [sortAsc, setSortAsc] = useState(true)
  const [selected, setSelected] = useState(() => new Set())
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const { language } = useLanguage()

  useEffect(() => { setMounted(true) }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    let data = suppliers.filter((s) =>
      [s.name, s.contact, s.email, s.category, s.id].some((f) => f.toLowerCase().includes(q))
    )
    if (status !== "all") data = data.filter((s) => s.status === status)
    if (category !== "all") data = data.filter((s) => s.category === category)
    data = [...data].sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    return data
  }, [suppliers, query, status, category, sortAsc])

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
    else setSelected(new Set(filtered.map((s) => s.id)))
  }

  const bulkDeactivate = () => {
    if (!selected.size) return
    setSuppliers((prev) => prev.map((s) => (selected.has(s.id) ? { ...s, status: "Inactive" } : s)))
    setSelected(new Set())
  }

  const bulkDelete = () => {
    if (!selected.size) return
    setSuppliers((prev) => prev.filter((s) => !selected.has(s.id)))
    setSelected(new Set())
  }

  const categories = ["Pharmaceutical", "Medical Equipment", "Supplies", "Laboratory", "Other"]

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? "opacity-100" : "opacity-0"} `}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight  ${mounted ? "opacity-100 " : "opacity-0 "}`}>{t('supplierManagement', language)}</h1>
              <p className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1   ${mounted ? "opacity-100 " : "opacity-0 "}`}>{t('manageSuppliers', language)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/admin/suppliers/add')}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#0f4c3a] text-white text-sm font-semibold hover:brightness-110 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('addSupplier', language)}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-4 shadow-sm  ${mounted ? "opacity-100 " : "opacity-0 "}`} >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('searchSuppliers', language)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]">
                    <option value="all">{t('allSuppliers', language)}</option>
                    <option value="Active">{t('active', language)}</option>
                    <option value="Inactive">{t('inactive', language)}</option>
                  </select>
                  <Filter className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                </div>
                <div className="relative">
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]">
                    <option value="all">{t('category', language)}</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                </div>
                <button onClick={() => setSortAsc((s) => !s)} className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                  <ArrowUpDown className="w-4 h-4" /> {t('sort', language)}
                </button>
              </div>
            </div>
          </div>

          {/* Bulk actions */}
          <div className={`flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400  ${mounted ? "opacity-100 " : "opacity-0 "}`} >
            <div>
              {selected.size > 0 ? <span className="font-medium">{selected.size}</span> : 0} {t('selected', language)}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={bulkDeactivate} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">{t('deactivate', language)}</button>
              <button onClick={bulkDelete} className="px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">{t('delete', language)}</button>
            </div>
          </div>

          {/* Table */}
          <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden  ${mounted ? "opacity-100 " : "opacity-0 "}`} >
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <th className="text-left px-3 py-3 w-10">
                      <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded border-gray-300 dark:border-gray-500 text-[#0f4c3a] focus:ring-[#0f4c3a] dark:bg-gray-700" />
                    </th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('supplierName', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('contact', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('category', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('rating', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('products', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('status', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('action', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, idx) => (
                    <tr key={s.id} className={`border-b last:border-b-0 dark:border-gray-700 ${idx % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-700/30" : "bg-white dark:bg-gray-800"} ${mounted ? "opacity-100" : "opacity-0"}`}>
                      <td className="px-3 py-3">
                        <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggleSelect(s.id)} className="rounded border-gray-300 dark:border-gray-500 text-[#0f4c3a] focus:ring-[#0f4c3a] dark:bg-gray-700" />
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{s.name}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">{s.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{s.contact}</p>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                            <Mail className="w-3 h-3" />
                            {s.email}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                            <Phone className="w-3 h-3" />
                            {s.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{s.category}</td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{s.rating}</span>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{s.products}</td>
                      <td className="px-2 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] sm:text-xs font-semibold ${statusBadge(s.status)}`}>
                          {s.status === 'Active' ? t('active', language) : t('inactive', language)}
                        </span>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/admin/suppliers/edit/${s.id}`)}
                            className="px-2 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            {t('edit', language)}
                          </button>
                          <button className="px-2 py-1.5 text-xs rounded-lg border border-red-300 dark:border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">{t('delete', language)}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">{t('noSuppliersFound', language)}</td>
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

export default SupplierList