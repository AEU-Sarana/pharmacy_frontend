import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MasterLayout from '../layouts/MasterLayout'
import Dashboard from '../pages/Dashboard'
import POS from '../pages/POS'

const FrontEndRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout /> }>
        <Route index element={<Dashboard />} />
        <Route path="pos" element={<POS />} />
      </Route>
    </Routes>
  )
}

export default FrontEndRoute
