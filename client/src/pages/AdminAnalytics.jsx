import { useEffect, useState } from 'react'
import api from '../api'

export default function AdminAnalytics(){
  const [a, setA] = useState(null)
  useEffect(()=>{ api.get('/api/admin/analytics').then(r=>setA(r.data)).catch(()=>{}) },[])
  if (!a) return <div className="card p-4">Loading...</div>
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card p-4"><div className="text-sm text-slate-500">Users</div><div className="text-3xl font-bold">{a.users}</div></div>
      <div className="card p-4"><div className="text-sm text-slate-500">Products</div><div className="text-3xl font-bold">{a.products}</div></div>
      <div className="card p-4"><div className="text-sm text-slate-500">Orders</div><div className="text-3xl font-bold">{a.orders}</div></div>
      <div className="card p-4"><div className="text-sm text-slate-500">Revenue</div><div className="text-3xl font-bold">₹ {(a.revenue_cents/100).toFixed(2)}</div></div>
    </div>
  )
}
