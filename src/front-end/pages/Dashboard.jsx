import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Search, Plus, Minus, Pill, Syringe, Stethoscope, Thermometer, Trash2 } from 'lucide-react'

const seedProducts = [
  { id: 'm1', name: 'Amoxicillin', strength: '500 mg', form: 'Capsule', rx: true, price: 12.50, sku: 'AMX-500-CAP', stock: 120, img: '/images/med_capsule.png', category: 'Prescription' },
  { id: 'm2', name: 'Paracetamol', strength: '500 mg', form: 'Tablet', rx: false, price: 3.99, sku: 'PCM-500-TAB', stock: 280, img: '/images/med_tablet.png', category: 'OTC' },
  { id: 'm3', name: 'Ibuprofen', strength: '200 mg', form: 'Tablet', rx: false, price: 4.50, sku: 'IBU-200-TAB', stock: 160, img: '/images/med_tablet.png', category: 'OTC' },
  { id: 'm4', name: 'Azithromycin', strength: '250 mg', form: 'Tablet', rx: true, price: 15.99, sku: 'AZM-250-TAB', stock: 60, img: '/images/med_tablet.png', category: 'Prescription' },
  { id: 'm5', name: 'Vitamin C', strength: '1000 mg', form: 'Effervescent', rx: false, price: 5.99, sku: 'VITC-1K-EFF', stock: 95, img: '/images/med_vitamin.png', category: 'Supplements' },
  { id: 'm6', name: 'Blood Glucose Strips', strength: '50 pcs', form: 'Strips', rx: false, price: 17.99, sku: 'BGS-50', stock: 40, img: '/images/med_device.png', category: 'Devices' },
  { id: 'm7', name: 'Cough Syrup', strength: '100 ml', form: 'Syrup', rx: false, price: 6.75, sku: 'COF-100-SYR', stock: 70, img: '/images/med_syrup.png', category: 'OTC' },
  { id: 'm8', name: 'Insulin', strength: '100 IU/ml', form: 'Vial', rx: true, price: 22.00, sku: 'INS-100-VIAL', stock: 25, img: '/images/med_vial.png', category: 'Prescription' },
]

const categories = [
  { key: 'Prescription', icon: Stethoscope },
  { key: 'OTC', icon: Pill },
  { key: 'Supplements', icon: Pill },
  { key: 'Devices', icon: Thermometer },
]

const currency = (n) => `$${n.toFixed(2)}`

const Dashboard = () => {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Prescription')
  const [query, setQuery] = useState('')
  const [cartItems, setCartItems] = useState([]) // {id, name, price, qty}
  const [patient, setPatient] = useState({ name: '', age: '', phone: '', allergies: '' })
  const [rx, setRx] = useState({ rxNumber: '', prescriber: '', directions: '', repeats: '' })
  const [tickets, setTickets] = useState([]) // {id, name, cartItems, patient, rx, createdAt}
  const [ticketName, setTicketName] = useState('')
  const searchRef = useRef(null)
  const payBtnRef = useRef(null)
  const barcodeBuffer = useRef('')
  const barcodeTimer = useRef(null)

  useEffect(() => setMounted(true), [])

  // Keyboard shortcuts and barcode capture
  useEffect(() => {
    const onKey = (e) => {
      // Ignore when typing in inputs except for barcode capture
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : ''
      const isInput = tag === 'input' || tag === 'textarea'

      // Barcode: scanners type fast then end with Enter
      const isChar = e.key.length === 1
      if (isChar && !e.ctrlKey && !e.metaKey) {
        if (barcodeTimer.current) clearTimeout(barcodeTimer.current)
        barcodeBuffer.current += e.key
        barcodeTimer.current = setTimeout(() => { barcodeBuffer.current = '' }, 40)
      } else if (e.key === 'Enter' && barcodeBuffer.current.length >= 6) {
        const code = barcodeBuffer.current
        barcodeBuffer.current = ''
        // Find by SKU or id
        const prod = seedProducts.find(p => p.sku?.toLowerCase() === code.toLowerCase() || p.id.toLowerCase() === code.toLowerCase())
        if (prod) addToCart(prod)
        return
      }

      if (isInput) return
      // Shortcuts
      switch (e.key.toLowerCase()) {
        case 'f': // focus search
          e.preventDefault()
          searchRef.current?.focus()
          break
        case '+':
          if (cartItems[0]) inc(cartItems[cartItems.length - 1].id)
          break
        case '-':
          if (cartItems[0]) dec(cartItems[cartItems.length - 1].id)
          break
        case 'h': // hold
          e.preventDefault(); doHold()
          break
        case 'r': // resume first ticket
          e.preventDefault(); if (tickets.length) resumeTicket(tickets[0].id)
          break
        case 'c': // clear cart
          e.preventDefault(); setCartItems([])
          break
        case 'p': // pay
          e.preventDefault(); payBtnRef.current?.click()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cartItems, tickets])

  const products = useMemo(() => {
    return seedProducts.filter(p => p.category === activeCategory && p.name.toLowerCase().includes(query.toLowerCase()))
  }, [activeCategory, query])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }]
    })
  }

  const inc = (id) => setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  const dec = (id) => setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
  const removeItem = (id) => setCartItems(prev => prev.filter(i => i.id !== id))

  // Hold/Resume tickets
  const doHold = () => {
    if (cartItems.length === 0) return
    const id = `T-${Date.now().toString().slice(-6)}`
    const name = ticketName || patient.name || 'Walk-in'
    setTickets(prev => [{ id, name, cartItems, patient, rx, createdAt: new Date().toISOString() }, ...prev])
    setCartItems([])
    setTicketName('')
  }
  const resumeTicket = (id) => {
    const t = tickets.find(t => t.id === id)
    if (!t) return
    setCartItems(t.cartItems)
    setPatient(t.patient)
    setRx(t.rx)
    setTickets(prev => prev.filter(x => x.id !== id))
  }

  const subTotal = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.qty, 0), [cartItems])
  const discountPct = 20
  const discount = useMemo(() => subTotal * (discountPct / 100), [subTotal])
  const taxPct = 0.15
  const tax = useMemo(() => (subTotal - discount) * taxPct, [subTotal, discount])
  const total = useMemo(() => subTotal - discount + tax, [subTotal, discount, tax])

  return (
    <div className={`min-h-[calc(100vh-80px)] w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Product panel */}
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <button className="text-base font-semibold text-emerald-700">+ NEW PRESCRIPTION</button>
              <div className="relative w-96">
                <input ref={searchRef} value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search medicines, SKU... (F to focus, scan barcode to add)" className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 outline-none text-base" />
                <Search className="w-5 h-5 text-gray-500 absolute left-4 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {products.map((p, idx) => (
                <button key={p.id} onClick={()=>addToCart(p)} className={`no-theme-anim bg-white dark:bg-gray-800 rounded-xl border border-emerald-100 dark:border-gray-700 shadow-sm p-4 text-left hover:shadow transition transform ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: `${80 + idx*30}ms`}}>
                  <div className="no-theme-anim h-28 w-full bg-gray-50 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img src={p.img} alt={p.name} className="h-full object-contain" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-base font-medium text-gray-800 dark:text-gray-100 line-clamp-1">{p.name}</p>
                    <span className={`text-[11px] px-2 py-0.5 rounded ${p.rx ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>{p.rx ? 'Rx' : 'OTC'}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.strength} • {p.form}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-emerald-600 text-base font-semibold">{currency(p.price)}</p>
                    <p className={`text-xs ${p.stock <= 30 ? 'text-orange-600' : 'text-gray-500 dark:text-gray-400'}`}>Stock: {p.stock}{p.stock <= 10 ? ' (Low)' : p.stock <= 30 ? ' (Few)' : ''}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Category bar */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map(cat => {
                const Icon = cat.icon
                const active = activeCategory === cat.key
                return (
                  <button key={cat.key} onClick={()=>setActiveCategory(cat.key)} className={`flex items-center justify-center gap-2 py-4 rounded-xl border transition-colors duration-200 ${active 
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>
                    <Icon className="w-6 h-6" />
                    <span className="text-base font-semibold">{cat.key}</span>
                  </button>
                )
              })}
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <button className="px-5 py-3 rounded-xl border border-red-400 text-red-600 bg-white dark:bg-transparent dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-base transition-colors" onClick={()=>setCartItems([])}>Clear</button>
                <button className="px-5 py-3 rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-base transition-colors" onClick={doHold}>Hold (H)</button>
              </div>
              <input value={ticketName} onChange={(e)=>setTicketName(e.target.value)} placeholder="Customer / Ticket name" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
            </div>
          </div>

          {/* Checkout panel */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-200">
              <div className="px-5 py-4 border-b bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
                <p className="font-semibold text-lg">Checkout</p>
                {/* Tickets queue */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  {tickets.map(t => (
                    <button key={t.id} onClick={()=>resumeTicket(t.id)} className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap transition-colors duration-200">{t.name} • {new Date(t.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</button>
                  ))}
                </div>
              </div>
              {/* Patient / Rx panel */}
              <div className="px-5 py-4 grid grid-cols-1 gap-3 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="grid grid-cols-2 gap-3">
                  <input value={patient.name} onChange={(e)=>setPatient({...patient, name:e.target.value})} placeholder="Patient name" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                  <input value={patient.age} onChange={(e)=>setPatient({...patient, age:e.target.value})} placeholder="Age" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input value={patient.phone} onChange={(e)=>setPatient({...patient, phone:e.target.value})} placeholder="Phone" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                  <input value={patient.allergies} onChange={(e)=>setPatient({...patient, allergies:e.target.value})} placeholder="Allergies" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input value={rx.rxNumber} onChange={(e)=>setRx({...rx, rxNumber:e.target.value})} placeholder="Rx Number" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                  <input value={rx.prescriber} onChange={(e)=>setRx({...rx, prescriber:e.target.value})} placeholder="Prescriber" className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
                </div>
                <textarea value={rx.directions} onChange={(e)=>setRx({...rx, directions:e.target.value})} placeholder="Directions (SIG)" rows={2} className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100" />
              </div>
              <div className="divide-y dark:divide-gray-700 max-h-[420px] overflow-y-auto transition-colors duration-200">
                {cartItems.map((i) => (
                  <div key={i.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex-1">
                      <p className="text-base font-medium">{i.name}</p>
                      {/* In a real app we'd include pack size/directions */}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>dec(i.id)} className="w-8 h-8 rounded-full border border-emerald-400 text-emerald-600 flex items-center justify-center"><Minus className="w-5 h-5"/></button>
                      <span className="w-7 text-center text-base font-semibold">{i.qty}</span>
                      <button onClick={()=>inc(i.id)} className="w-8 h-8 rounded-full border border-emerald-400 text-emerald-600 flex items-center justify-center"><Plus className="w-5 h-5"/></button>
                      <button onClick={()=>removeItem(i.id)} className="ml-2 text-gray-400 hover:text-red-500"><Trash2 className="w-5 h-5"/></button>
                    </div>
                    <div className="w-24 text-right text-base">{currency(i.price * i.qty)}</div>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <div className="px-5 py-10 text-center text-base text-gray-500 dark:text-gray-400">No items in cart</div>
                )}
              </div>

              <div className="p-5 space-y-2 text-base">
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300"><span>Items</span><span>{cartItems.length}</span></div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300"><span>Discount (%)</span><span>{discountPct}</span></div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300"><span>Sub Total</span><span>{currency(subTotal)}</span></div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300"><span>Tax {(taxPct*100).toFixed(0)}%</span><span>{currency(tax)}</span></div>
                <div className="pt-2 flex items-center justify-between font-semibold text-gray-800 dark:text-gray-100 text-lg"><span>Total</span><span className="text-emerald-400 dark:text-emerald-400">{currency(total)}</span></div>
              </div>

              <div className="p-4 bg-emerald-600">
                <button ref={payBtnRef} className="w-full py-4 rounded-lg bg-emerald-600 text-white font-semibold text-lg hover:brightness-110">Pay ({currency(total)})</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


