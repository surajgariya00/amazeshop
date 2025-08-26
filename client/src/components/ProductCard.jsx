import { Link } from 'react-router-dom'

export default function ProductCard({p}){
  return (
    <Link to={`/product/${p.id}`} className="card overflow-hidden group">
      <img src={p.image} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition" loading="lazy"/>
      <div className="p-4">
        <div className="font-medium line-clamp-2">{p.title}</div>
        <div className="text-sm text-slate-600 line-clamp-2">{p.description}</div>
        <div className="mt-2 font-semibold">₹ {(p.price/100).toFixed(2)}</div>
        <div className="text-xs text-slate-500">{p.rating} ★ ({p.rating_count})</div>
      </div>
    </Link>
  )
}
