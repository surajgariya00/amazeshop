import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Store, Search, User, LogOut } from 'lucide-react'
import useStore from './store/useStore'

export default function App(){
  const { cart, user, logout } = useStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Store size={22}/> Amaze<span className="text-blue-600">Shop</span>
          </Link>
          <div className="flex-1 max-w-xl mx-auto">
            <form onSubmit={(e)=>{e.preventDefault(); const q=e.currentTarget.q.value; navigate('/browse?q='+encodeURIComponent(q))}} className="relative">
              <input name="q" placeholder="Search products..." className="w-full rounded-2xl border px-4 py-2 pl-10"/>
              <Search className="absolute left-3 top-2.5" size={18}/>
            </form>
          </div>
          <nav className="flex items-center gap-4">
            <NavLink to="/browse" className="hover:underline">Browse</NavLink>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="flex items-center gap-1 text-sm hover:underline"><LogOut size={16}/> Logout</button>
                <NavLink to="/orders" className="hover:underline">Orders</NavLink>
              </div>
            ) : (
              <NavLink to="/login" className="flex items-center gap-1"><User size={18}/> Login</NavLink>
            )}
            <NavLink to="/cart" className="relative flex items-center">
              <ShoppingCart/>
              {cart.totalQty>0 && <span className="absolute -right-2 -top-2 text-xs bg-blue-600 text-white rounded-full px-2">{cart.totalQty}</span>}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 grid sm:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold mb-2">AmazeShop</div>
            <p className="text-sm text-slate-600">A beautiful demo store built with React & Express. All data is dummy. © {new Date().getFullYear()}</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Links</div>
            <ul className="text-sm space-y-1">
              <li><Link to="/browse">All Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Newsletter</div>
            <form className="flex gap-2">
              <input placeholder="you@example.com" className="rounded-2xl border px-3 py-2 flex-1"/>
              <button className="btn">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  )
}
