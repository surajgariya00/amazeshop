import { useEffect, useState } from 'react'
import api from '../api'

export default function AdminProducts(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({title:'', description:'', price:'', image:'', stock:100})
  const load = ()=> api.get('/api/admin/products').then(r=>setItems(r.data)).catch(()=>{})
  useEffect(()=>{ load() },[])

  const save = async ()=>{
    await api.post('/api/admin/products', {...form, price: parseInt(form.price)})
    setForm({title:'', description:'', price:'', image:'', stock:100})
    load()
  }
  const del = async (id)=>{ if(!confirm('Delete product?'))return; await api.delete('/api/admin/products/'+id); load() }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card p-4">
        <div className="font-semibold mb-2">Products</div>
        <div className="max-h-[600px] overflow-auto divide-y">
          {items.map(p=>(
            <div key={p.id} className="py-3 flex items-center gap-4">
              <img src={p.image} className="w-16 h-16 object-cover rounded-xl"/>
              <div className="flex-1">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-slate-600">₹ {(p.price/100).toFixed(2)} • Stock: {p.stock}</div>
              </div>
              <button onClick={()=>del(p.id)} className="px-3 py-1 rounded-xl border">Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">Add Product</div>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full rounded-xl border px-3 py-2 mb-2"/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full rounded-xl border px-3 py-2 mb-2"/>
        <input placeholder="Price (cents)" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="w-full rounded-xl border px-3 py-2 mb-2"/>
        <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form, image:e.target.value})} className="w-full rounded-xl border px-3 py-2 mb-2"/>
        <input placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} className="w-full rounded-xl border px-3 py-2 mb-2"/>
        <button onClick={save} className="btn w-full">Save</button>
      </div>
    </div>
  )
}
