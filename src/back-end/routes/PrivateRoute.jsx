import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  // Very simple example guard. Replace with real auth/role from your store.
  const location = useLocation()
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
  const isAdmin = role === 'super_admin'

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}

export default PrivateRoute
