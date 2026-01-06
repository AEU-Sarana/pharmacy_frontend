import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Building2, Phone, Mail, MapPin, Star } from 'lucide-react'

const EditSupplier = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    website: '',
    taxId: '',
    paymentTerms: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => setMounted(true), [])

  // Mock supplier data - replace with API call
  const mockSuppliers = [
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
      lastOrder: "2025-01-15",
      // Additional fields for edit form
      website: "https://medsupply.com",
      taxId: "12-3456789",
      paymentTerms: "Net 30",
      notes: "Reliable pharmaceutical supplier"
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
      lastOrder: "2025-01-10",
      // Additional fields for edit form
      website: "https://pharmacorp.com",
      taxId: "98-7654321",
      paymentTerms: "Net 15",
      notes: "Specializes in medical equipment"
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
      lastOrder: "2024-12-20",
      // Additional fields for edit form
      website: "",
      taxId: "",
      paymentTerms: "",
      notes: ""
    },
  ]

  useEffect(() => {
    // Simulate API call to fetch supplier data
    const fetchSupplier = async () => {
      setLoading(true)
      try {
        // Remove artificial delay for better performance
        const supplier = mockSuppliers.find(s => s.id === id)
        if (supplier) {
          setFormData({
            name: supplier.name,
            contact: supplier.contact,
            email: supplier.email,
            phone: supplier.phone,
            address: supplier.address,
            category: supplier.category,
            website: supplier.website || '',
            taxId: supplier.taxId || '',
            paymentTerms: supplier.paymentTerms || '',
            notes: supplier.notes || ''
          })
        } else {
          // Supplier not found, redirect back
          navigate('/admin/suppliers')
        }
      } catch (error) {
        console.error('Error fetching supplier:', error)
        navigate('/admin/suppliers')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchSupplier()
    }
  }, [id, navigate])

  const categories = [
    'Pharmaceutical', 'Medical Equipment', 'Supplies', 'Laboratory', 'Other'
  ]

  const paymentTerms = [
    'Net 30', 'Net 15', 'Net 60', 'Cash on Delivery', 'Prepaid', 'Other'
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Supplier name is required'
    if (!formData.contact.trim()) newErrors.contact = 'Contact person is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.category) newErrors.category = 'Category is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      // Remove artificial delay for better performance
      
      // Update supplier data
      const updatedSupplier = {
        id: id,
        ...formData
      }
      
      console.log('Updated supplier:', updatedSupplier)
      
      // Navigate back to suppliers list
      navigate('/admin/suppliers')
    } catch (error) {
      console.error('Error updating supplier:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f4c3a] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading supplier...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`h-full w-full bg-gray-50 dark:bg-gray-900 ${mounted ? 'opacity-100' : 'opacity-0'} `}>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/admin/suppliers')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">Edit Supplier</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update supplier information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-[#0f4c3a]" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Supplier Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] ${
                      errors.name ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    placeholder="Enter supplier name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleChange('contact', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] ${
                      errors.contact ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    placeholder="Contact person name"
                  />
                  {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] ${
                      errors.category ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tax ID
                  </label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => handleChange('taxId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder="Tax identification number"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-[#0f4c3a]" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] ${
                      errors.email ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    placeholder="supplier@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] ${
                      errors.phone ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                    placeholder="+1-555-0123"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#0f4c3a]" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Address Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder="123 Main Street, City, State, ZIP Code"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-[#0f4c3a]" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Additional Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={formData.paymentTerms}
                    onChange={(e) => handleChange('paymentTerms', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select payment terms</option>
                    {paymentTerms.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f4c3a] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder="Additional notes about this supplier"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/suppliers')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#0f4c3a] text-white rounded-lg hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Updating...' : 'Update Supplier'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditSupplier
