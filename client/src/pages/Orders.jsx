import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../api'

export default function Orders(){
  const [orders, setOrders] = useState([])
  const loc = useLocation()
  useEffect(()=>{ api.get('/api/orders').then(r=>setOrders(r.data)).catch(()=>{}) },[])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {loc.state?.placed && <div className="mb-4 p-3 rounded-xl bg-green-50 border text-green-700">Order #{loc.state.placed} placed successfully!</div>}
      <div className="space-y-4">
        {orders.map(o=>(
          <div key={o.id} className="card p-4">
            <div className="flex justify-between">
              <div>Order <span className="font-semibold">#{o.id}</span></div>
              <div className="text-sm">{new Date(o.created_at).toLocaleString()}</div>
            </div>
            <div className="mt-2 text-sm">Status: <span className="font-medium">{o.status}</span> • Total: <span className="font-medium">₹ {(o.total_cents/100).toFixed(2)}</span></div>
            <div className="mt-3">
              {o.items.map(it=>(<div key={it.id} className="text-sm text-slate-700">• {it.quantity} × #{it.product_id} — ₹ {(it.price_cents/100).toFixed(2)}</div>))}
            </div>
          </div>
        ))}
        {orders.length===0 && <div className="card p-4">No orders yet.</div>}
      </div>
    </div>
  )
}
