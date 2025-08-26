import { useEffect, useState } from 'react'
import api from '../api'

export default function AdminOrders(){
  const [items, setItems] = useState([])
  useEffect(()=>{ api.get('/api/admin/orders').then(r=>setItems(r.data)).catch(()=>{}) },[])
  return (
    <div className="card p-4">
      <div className="font-semibold mb-2">Orders</div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>ID</th><th>User</th><th>Status</th><th>Total</th><th>Created</th></tr></thead>
          <tbody>
            {items.map(o=>(
              <tr key={o.id} className="border-t">
                <td>#{o.id}</td>
                <td>{o.user_id}</td>
                <td>{o.status}</td>
                <td>₹ {(o.total_cents/100).toFixed(2)}</td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
