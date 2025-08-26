import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'

export default function Browse(){
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState({items:[], page:1, pageSize:20, total:0})
  const [categories, setCategories] = useState([])
  const [cat, setCat] = useState(params.get('category')||'')
  const [sort, setSort] = useState('relevance')
  const q = params.get('q') || ''

  useEffect(()=>{ api.get('/api/products/categories').then(r=>setCategories(r.data)) },[])

  const load = (pg=1)=>{
    api.get('/api/products',{ params: { page: pg, pageSize: 20, q, category: cat, sort } })
      .then(r=>setProducts(r.data))
  }
  useEffect(()=>{ load(1) },[q, cat, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Filters categories={categories} selected={cat} onSelect={setCat} sort={sort} onSort={setSort}/>
      </div>
      {q && <div className="mb-3 text-sm text-slate-600">Search: <span className="font-medium">"{q}"</span></div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.items.map(p=><ProductCard key={p.id} p={p}/>)}
      </div>
      <Pagination page={products.page} pageSize={products.pageSize} total={products.total} onPage={(p)=>load(p)}/>
    </div>
  )
}
