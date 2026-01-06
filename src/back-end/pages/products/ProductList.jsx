import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Package, Search, Filter, Tags, ArrowUpDown, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import { OptimizedTable, TableRow, TableCell } from "../../../components/OptimizedTable"
import { useLanguage, t } from "../../../contexts/LanguageContext"

const initialProducts = [
  { id: "PRD-0001", name: "Paracetamol 500mg", category: "Analgesic", sku: "PARA-500", price: 2.5, stock: 240, status: "Active" },
  { id: "PRD-0002", name: "Amoxicillin 500mg", category: "Antibiotic", sku: "AMOX-500", price: 5.2, stock: 92, status: "Active" },
  { id: "PRD-0003", name: "Ibuprofen 200mg", category: "NSAID", sku: "IBU-200", price: 3.1, stock: 18, status: "Low" },
  { id: "PRD-0004", name: "Omeprazole 20mg", category: "PPI", sku: "OME-20", price: 4.4, stock: 0, status: "Inactive" },
  { id: "PRD-0005", name: "Loratadine 10mg", category: "Antihistamine", sku: "LORA-10", price: 2.2, stock: 130, status: "Active" },
]

const statusBadge = (status) => {
  if (status === "Active") return "bg-green-100 text-green-700"
  if (status === "Low") return "bg-yellow-100 text-yellow-700"
  return "bg-red-100 text-red-700"
}

const ProductList = () => {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [sortAsc, setSortAsc] = useState(true)
  const [selected, setSelected] = useState(() => new Set())
  const [products, setProducts] = useState(initialProducts)
  const { language } = useLanguage()

  useEffect(() => { setMounted(true) }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    let data = products.filter((p) =>
      [p.name, p.category, p.sku, p.id].some((f) => f.toLowerCase().includes(q))
    )
    if (status !== "all") data = data.filter((p) => (status === "active" ? p.status === "Active" : status === "low" ? p.status === "Low" : p.status === "Inactive"))
    data = [...data].sort((a, b) => (sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    return data
  }, [products, query, status, sortAsc])

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
    else setSelected(new Set(filtered.map((p) => p.id)))
  }

  const bulkDeactivate = () => {
    if (!selected.size) return
    setProducts((prev) => prev.map((p) => (selected.has(p.id) ? { ...p, status: "Inactive" } : p)))
    setSelected(new Set())
  }

  const bulkDelete = () => {
    if (!selected.size) return
    setProducts((prev) => prev.filter((p) => !selected.has(p.id)))
    setSelected(new Set())
  }

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? "opacity-100" : "opacity-0"} `}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight  ${mounted ? "opacity-100 " : "opacity-0 "}`}>{t('productManagement', language)}</h1>
              <p className={`text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1   ${mounted ? "opacity-100 " : "opacity-0 "}`}>{t('manageProducts', language)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/admin/products/add')}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#0f4c3a] text-white text-sm font-semibold hover:brightness-110 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('addProduct', language)}
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
                  placeholder={t('searchProducts', language)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]">
                    <option value="all">{t('allProducts', language)}</option>
                    <option value="active">{t('active', language)}</option>
                    <option value="low">{t('low', language)} {t('stock', language)}</option>
                    <option value="inactive">{t('inactive', language)}</option>
                  </select>
                  <Filter className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" />
                </div>
                <button onClick={() => setSortAsc((s) => !s)} className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                  <ArrowUpDown className="w-4 h-4" /> {t('sort', language)}
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Tags className="w-4 h-4" /> {t('category', language)}
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
              <OptimizedTable className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <th className="text-left px-3 py-3 w-10">
                      <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded border-gray-300 dark:border-gray-500 text-[#0f4c3a] focus:ring-[#0f4c3a] dark:bg-gray-700" />
                    </th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('productName', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('category', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">{t('sku', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('price', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('stock', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('status', language)}</th>
                    <th className="text-left px-2 py-3 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">{t('action', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, idx) => (
                    <tr key={p.id} className={`border-b last:border-b-0 dark:border-gray-700 ${idx % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-700/30" : "bg-white dark:bg-gray-800"} ${mounted ? "opacity-100" : "opacity-0"}`}>
                      <td className="px-3 py-3">
                        <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} className="rounded border-gray-300 dark:border-gray-500 text-[#0f4c3a] focus:ring-[#0f4c3a] dark:bg-gray-700" />
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.name}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{p.category}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{p.sku}</td>
                      <td className="px-2 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">${'{'}p.price.toFixed(2){'}'}</td>
                      <td className="px-2 py-3 text-sm text-gray-700 dark:text-gray-300">{p.stock}</td>
                      <td className="px-2 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-semibold ${statusBadge(p.status)}`}>
                          {p.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> : p.status === "Low" ? <AlertTriangle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {p.status === "Active" ? t('active', language) : p.status === "Low" ? t('low', language) : t('inactive', language)}
                        </span>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/admin/products/edit/${p.id}`)}
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
                      <td colSpan={8} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">No products match your filters</td>
                    </tr>
                  )}
                </tbody>
                </OptimizedTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList


