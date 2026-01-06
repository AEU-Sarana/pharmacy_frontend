import { Routes, Route } from "react-router-dom"
import MasterLayout from "../layouts/MasterLayout"
import Dashboard from "../pages/dashboard/Dashboard"
import Login from "../pages/auth/Login"
import CustomerList from "../pages/customers/CustomerList"
import SupplierList from "../pages/suppliers/SupplierList"
import AddSupplier from "../pages/suppliers/AddSupplier"
import EditSupplier from "../pages/suppliers/EditSupplier"
import Sales from "../pages/sales/Sales"
import ProductList from "../pages/products/ProductList"
import AddProduct from "../pages/products/AddProduct"
import EditProduct from "../pages/products/EditProduct"
import Inventory from "../pages/inventory/Inventory"
import AddInventory from "../pages/inventory/AddInventory"
import EditInventory from "../pages/inventory/EditInventory"
import WholesaleQuickOrder from "../pages/wholesale/WholesaleQuickOrder"
import PriceLists from "../pages/wholesale/PriceLists"
import SettingsProfile from "../pages/settings/SettingsProfile"

const BackendRoute = () => {
  return (
    <Routes>
      {/* Public auth routes (no layout) */}
      <Route path="login" element={<Login />} />
      <Route path="/" element={<MasterLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="sales" element={<Sales />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="suppliers" element={<SupplierList />} />
        <Route path="suppliers/add" element={<AddSupplier />} />
        <Route path="suppliers/edit/:id" element={<EditSupplier />} />
        <Route path="inventory" element={<Inventory />} /> 
        <Route path="inventory/add" element={<AddInventory />} />
        <Route path="inventory/edit/:id" element={<EditInventory />} />
        <Route path="wholesale/quick-order" element={<WholesaleQuickOrder />} />
        <Route path="wholesale/price-lists" element={<PriceLists />} />
        <Route path="settings" element={<SettingsProfile />} />
      </Route>
    </Routes>
  )
}

export default BackendRoute
