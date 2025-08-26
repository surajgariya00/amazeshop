import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import useStore from '../store/useStore'
import ProductCard from '../components/ProductCard'

export default function Product(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const { addToCart } = useStore()

  useEffect(()=>{ api.get('/api/products/'+id).then(r=>setP(r.data)) },[id])
  if (!p) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={p.image} alt={p.title} className="w-full rounded-2xl border object-cover"/>
        <div>
          <h1 className="text-3xl font-bold">{p.title}</h1>
          <div className="text-sm text-slate-600">{p.rating} ★ ({p.rating_count} reviews)</div>
          <div className="mt-3 text-2xl font-bold">₹ {(p.price/100).toFixed(2)}</div>
          <p className="mt-4 text-slate-700">{p.description}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={()=>addToCart(p,1)} className="btn">Add to Cart</button>
          </div>
          <div className="mt-3 text-sm text-slate-600">Stock: {p.stock}</div>
          <div className="mt-4">
            <div className="font-semibold">Categories</div>
            <div className="flex gap-2 mt-1">
              {p.categories.map(c=><span key={c.id} className="px-3 py-1 rounded-full bg-slate-100 text-sm">{c.name}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Related Items</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {p.related.map(x=><ProductCard key={x.id} p={x}/>)}
        </div>
      </div>
    </div>
  )
}
