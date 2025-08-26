import { Outlet, NavLink } from 'react-router-dom'

export default function AdminDashboard(){
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <div className="flex gap-3 mb-4">
        <NavLink to="/admin" end className="px-3 py-2 rounded-xl border">Analytics</NavLink>
        <NavLink to="/admin/products" className="px-3 py-2 rounded-xl border">Products</NavLink>
        <NavLink to="/admin/orders" className="px-3 py-2 rounded-xl border">Orders</NavLink>
      </div>
      <Outlet />
    </div>
  )
}
