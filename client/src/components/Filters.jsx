export default function Filters({categories, selected, onSelect, sort, onSort}){
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select value={selected||''} onChange={e=>onSelect(e.target.value||null)} className="rounded-2xl border px-3 py-2">
        <option value="">All Categories</option>
        {categories.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}
      </select>
      <select value={sort} onChange={e=>onSort(e.target.value)} className="rounded-2xl border px-3 py-2">
        <option value="relevance">Relevance</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  )
}
